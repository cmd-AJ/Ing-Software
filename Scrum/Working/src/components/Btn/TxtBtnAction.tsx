interface ContainerProps {
	text : string
	action : (literal : any) => any
}

const TxtBtnAction : React.FC<ContainerProps> = ({text, action}) => {
	return (
		<p className="txt-button" onClick={action}>
			{text}			
		</p>	
	)
}

export default TxtBtnAction
