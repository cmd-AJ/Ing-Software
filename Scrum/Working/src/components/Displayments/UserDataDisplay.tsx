import VerticalDivider from "../Dividers/VerticalDivider";
import VerticalDisplay from "../Dividers/VerticalDivider";
import ContratsDisplay from "./ContratsDisplay";
import JobsDisplay from "./JobsDisplay";

interface ContainerProps {

}

const UserDataDisplay: React.FC<ContainerProps> = () => {
    return (
        <div style={{display: 'flex', height: '100%', minHeight: '378px'}}>
            <ContratsDisplay/>
            <VerticalDivider />
            <JobsDisplay />
        </div>
    )
}

export default UserDataDisplay;