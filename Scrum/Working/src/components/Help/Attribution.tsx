interface AttributionProps {
    name: string;
    link: string;
    color?: string;
    linkColor?: string;
  }
  function Attribution({
    name,
    link,
    color = "black",
    linkColor = "blue",
  }: AttributionProps) {
    return (
      <>
        <div
          className="attribution"
          style={{
            textAlign: "center",
            color: color,
            // marginTop: "auto",
            marginBottom: "1rem",
            fontSize: "1.4rem",
          }}
        >
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            style={{ color: linkColor }}
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href={link} style={{ color: linkColor }}>
            {name}
          </a>
          .
        </div>
      </>
    );
  }
  
  export default Attribution;