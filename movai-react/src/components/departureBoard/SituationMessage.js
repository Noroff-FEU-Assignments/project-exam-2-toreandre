const SituationMessage = ({ messages }) => {
    if (!messages || messages.length === 0) return null;
  
    return (
		<div className="situation-messages">
			{messages.map((message, index) => (
				<div key={index} className={`message ${message.severity}`}>
					{message.text}
				</div>
			))}
		</div>
    );
};
  