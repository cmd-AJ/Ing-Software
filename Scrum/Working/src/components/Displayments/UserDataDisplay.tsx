import VerticalDivider from "../Dividers/VerticalDivider";
import VerticalDisplay from "../Dividers/VerticalDivider";
import ContratsDisplay from "./ContratsDisplay";

interface ContainerProps {

}

const UserDataDisplay: React.FC<ContainerProps> = () => {
    return (
        <div style={{display: 'flex'}}>
            <ContratsDisplay/>
            <VerticalDivider />
            <div></div>
        </div>
    )
}

export default UserDataDisplay;