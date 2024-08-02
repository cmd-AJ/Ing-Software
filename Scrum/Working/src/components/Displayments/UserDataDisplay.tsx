import VerticalDivider from "../Dividers/VerticalDivider";
import VerticalDisplay from "../Dividers/VerticalDivider";
import ContratsDisplay from "./ContratsDisplay";
import JobsDisplay from "./JobsDisplay";

interface ContainerProps {
    dpi: string
    role: string
}

const UserDataDisplay: React.FC<ContainerProps> = ({dpi, role}) => {
    return (
        <div style={{display: 'flex', height: '100%', minHeight: '378px'}}>
            <ContratsDisplay dpi={dpi}/>
            <VerticalDivider />
            <JobsDisplay />
        </div>
    )
}

export default UserDataDisplay;