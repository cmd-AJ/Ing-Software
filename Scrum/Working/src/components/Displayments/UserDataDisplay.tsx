import TrustPeople from "./TrustPeople";
import VerticalDivider from "../Dividers/VerticalDivider";
import ContratsDisplay from "./ContratsDisplay";
import JobsDisplay from "./JobsDisplay";

interface ContainerProps {
    dpi: string
    role: string
}

const UserDataDisplay: React.FC<ContainerProps> = ({dpi, role}) => {

    if (role === 'Empleador'){
        return (
            <div style={{display: 'flex', height: '100%', minHeight: '378px'}}>
                <TrustPeople />
                <VerticalDivider/>
            </div>
        )
    } else {
        return (
            <div style={{display: 'flex', height: '100%', minHeight: '378px'}}>
                <ContratsDisplay dpi={dpi}/>
                <VerticalDivider />
                <JobsDisplay dpi={dpi}/>
            </div>
        )
    }
}

export default UserDataDisplay;