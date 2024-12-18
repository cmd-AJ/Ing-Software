import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import Chat from "./Chat";
import Details from "./Details";
import Bottom from "./Bottom";
import { useHistory } from "react-router-dom";
import { getUser2 } from "../../controller/UserController";
import { getContacts, getChatMessages, getChatIdWithDPI } from "../../controller/ChatController";
import { useLocation } from "react-router";
import TextND from "../Txt/TextND";
import { IonButton } from "@ionic/react";

type chatUser = {
  dpi: string;
  img: string;
  name: string;
};

type ChatMessage = {
  contenido: string;
  time: string;
  dpi: string;
};

type FormattedMessage = {
  message: string;
  time: string;
  date: string;
  sender: "me" | "you";
};

const Sidebar = () => {
  const history = useHistory();

    const [firstInteraction, setFirstInteraction] = useState(localStorage.getItem("firstInteraction"))
    const [tempcontacts, settempcontact] = useState(new Set())
    const defaultChatUser: chatUser = { dpi: '', name: '',img:'' }
    const [findbar, setfindbar] = useState('');
    const [selectedPerson, setSelectedPerson] = useState<chatUser>(defaultChatUser);
    const [selectedPersonbef, setSelectedPersonbef] = useState<chatUser | null>(null);
    const [contacts, setContacts] = useState<chatUser[]>([]);
    const [messages, setMessages] = useState<FormattedMessage[]>([]);
    const [loggedUserDpi] = useState(localStorage.getItem('dpi') || '');
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [chatID, setChatID] = useState("")
    const [hiring, setHiring] = useState(false)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dpiChat = queryParams.get("chat");

  const messagesRef = useRef(messages);
  const selectedPersonRef = useRef(selectedPerson);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    selectedPersonRef.current = selectedPerson;
    const fecthChat = async () => {
      const data = await getChatIdWithDPI(loggedUserDpi, selectedPerson.dpi)        
      setChatID(data[0].idchat)
      setHiring(data[0].hiring)
        
    }

    fecthChat()
  }, [selectedPerson]);

  const requestNotificationPermission = async () => {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio("/notisound.wav");
    audio.play();
  };

  // Fetch contacts on component mount
  useEffect(() => {
    requestNotificationPermission();

    const fetchData = async () => {
      try {
        const contactsData = await getContacts(loggedUserDpi);
        setContacts(contactsData);
        const newTempContacts = new Set();

        // Add logic to include indices from the fetched data
        for (let index = 0; index < contactsData.length; index++) {
          newTempContacts.add(index); // Include all indices for demonstration
        }

        settempcontact(newTempContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData();

    return () => {
      setContacts([]);
      settempcontact(new Set());
    };
  }, [loggedUserDpi]);

  useEffect(() => {
    const newTempContacts = new Set();
    contacts.forEach((contact, index) => {
      if (contact.name.toLowerCase().includes(findbar.toLowerCase())) {
        newTempContacts.add(index);
      }
    });
    settempcontact(newTempContacts); // Update tempcontacts based on the search
  }, [findbar, contacts]); // Runs when findbar or contacts change

  // Handle window resize
  useEffect(() => {
    const user = localStorage.getItem("notUser");

    if (dpiChat && user) {
      const parsedUser = JSON.parse(user);

      if (parsedUser.dpi === dpiChat) {
        setSelectedPerson({
          name:
            parsedUser.nombre.split(" ")[0] +
            " " +
            parsedUser.apellidos.split(" ")[0],
          img: parsedUser.imagen,
          dpi: parsedUser.dpi,
        });
      }
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch messages every 5 seconds (Polling)
  useEffect(() => {

    const fecthChat = async () => {
      const data = await getChatIdWithDPI(loggedUserDpi, selectedPerson.dpi)        
      console.log(data);
      
      setHiring(data[0].hiring)
        
    }

    const interval = setInterval(() => {
      if (selectedPerson) {
        updateMessages();
        fecthChat()
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedPerson, loggedUserDpi]);

  const formatMessagesWithDateDividers = (chatMessages: ChatMessage[]) => {
    return chatMessages.map((msg) => ({
      message: msg.contenido,
      time: msg.time,
      date: msg.time.split("T")[0],
      sender: msg.dpi === loggedUserDpi ? ("me" as const) : ("you" as const),
    }));
  };

  // Manejo del clic en una persona/contacto
  const handlePersonClick = async (dpi: string) => {
    setSelectedPersonbef(selectedPerson);
    const selectedPerson2 = contacts.find((person) => person.dpi === dpi);

    if (
      selectedPerson &&
      selectedPerson.dpi !== selectedPerson2?.dpi &&
      isDetailsOpen
    ) {
      setIsDetailsOpen(false);
    }

    if (selectedPerson2) {
      setSelectedPerson(selectedPerson2);
      localStorage.setItem("SelectedPerson", selectedPerson2.dpi);
    } else {
      setSelectedPerson(defaultChatUser);
    }

    try {
      const chatMessages = (await getChatMessages(
        loggedUserDpi,
        dpi
      )) as ChatMessage[];
      const formattedMessages = formatMessagesWithDateDividers(chatMessages);
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const updateMessages = async () => {
    if (selectedPerson) {
      try {
        const chatMessages = (await getChatMessages(
          loggedUserDpi,
          selectedPerson.dpi
        )) as ChatMessage[];
        const formattedMessages = formatMessagesWithDateDividers(chatMessages);

        if (chatMessages.length > messagesRef.current.length) {
          playNotificationSound();
        }
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    }
  };

  const handleClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setfindbar(event.target.value);

    const contactsleng = contacts.length;
    const deben = new Set(
      Array.from({ length: contactsleng }, (_, index) => index)
    );

    for (let index = 0; index < contacts.length; index++) {
      const dato = contacts[index].name + "";

      if (!dato.includes(findbar)) {
        deben.delete(index);
      }
    }

    settempcontact(deben);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      const deben = new Set(
        Array.from({ length: contacts.length }, (_, index) => index)
      );

      if (findbar != "") {
        for (let index = 0; index < contacts.length; index++) {
          const dato = contacts[index].name + "";

          if (!dato.includes(findbar)) {
            deben.delete(index);
          }
        }
      }

      settempcontact(deben);
    }
  };

  const handleClickName = async (dpi: string) => {
    let userDPI = "";
    const user = localStorage.getItem("User");
    const data = await getUser2(dpi);
    if (data && data.length > 0) {
      localStorage.setItem("notUser", JSON.stringify(data[0]));

      // Check if the clicked user is the logged-in user
      if (userDPI && userDPI === data[0].dpi) {
        data.
        history.push("/empleado?ownerUser=true");
      } else {
        history.push("/empleado?ownerUser=false");
      }
    } else {
      console.error("User not found.");
    }
  };

  return (
    <div className={`wrapper ${isDetailsOpen ? "blur" : ""}`}>
      <div className="container1">
        <div className="left">
          <div className="top">
            {windowWidth >= 600 && (
              <input
                className="searchpeople"
                type="text"
                placeholder="Search"
                onChange={handleClick}
                onKeyDown={handleKeyDown}
                value={findbar}
              />
            )}
          </div>
          <div className="scrollable-content">
            <ul className="people">
              {contacts
                .filter((_, index) => tempcontacts.has(index)) // Filter based on the Set
                .map((person, index) => (
                  <li
                    key={index}
                    className={`person ${
                      selectedPerson && selectedPerson.dpi === person.dpi
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {handlePersonClick(person.dpi)
                      localStorage.setItem('firstInteraction', 'false')
                      setFirstInteraction(localStorage.getItem('firstInteraction'))
                    }
                    }
                  >
                    <img className="imagen" src={person.img} alt="" />
                    <div className="text-container">
                      <span className="name">{person.name}</span>
                      <span className="preview">{person.preview}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <div className={`top ${selectedPerson ? "chat-selected" : ""}`}>
            {selectedPerson ? (
              <div className="chat-info">
                <img
                  className="chat-image"
                  src={selectedPerson.img}
                  alt={`${selectedPerson.name}'s avatar`}
                />
                <span
                  className="name"
                  onClick={() => {
                    handleClickName(selectedPerson.dpi);
                  }}
                >
                  {selectedPerson.name}
                </span>
              </div>
            ) : (
              <span className="name">Selecciona un chat</span>
            )}
          </div>
          { hiring &&
            <div className="hiring-notification">
              <TextND size="small" hex="#FFF" text="Contratación en proceso..."/>
              <IonButton color="tertiary" onClick={() => setIsDetailsOpen(true)}>
                Realizar nueva propuesta
              </IonButton>
            </div>
          }
          {isDetailsOpen || firstInteraction === "true" ? (
            <Details
              onClose={() => setIsDetailsOpen(false)}
              setFirstInteraction={setFirstInteraction}
              loggedUserDpi={loggedUserDpi}
              selectedPersonDpi={selectedPerson ? selectedPerson.dpi : ""}
              chatID={chatID}
            />
          ) : (
            <Chat messages={messages} hiring={hiring} idChat={chatID}/>
          )}
          <div className="bottom">
            <Bottom
              loggedUserDpi={loggedUserDpi}
              selectedPersonDpi={selectedPerson ? selectedPerson.dpi : ""}
              updateMessages={updateMessages}
              onHireClick={() => setIsDetailsOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
