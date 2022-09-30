import { ServoiceFeedback } from 'react-feedback-widget';

function Feedback() {
  const config = {
    servId: 'cl8nkyrd5000709l7o7pdu3zy',
    servPID: 'cl8nkyrd5000809l7tou9cpxc',
    userEmail: 'luizfelipewarmling@gmail.com',
    userFirstName: 'Luiz Felipe',
    userLastName: 'Warmling Amadeu',
  };
  return (


      <div className="absolute mt-1 flex-grow justify-end flex-wrap items-center ">
      <ServoiceFeedback config={config}>
        <button className="bottom-4 right-4 p-2 rounded-l-lg rounded-t-lg bg-blue-800 hover:bg-blue-600 shadow-md hover:shadow-lg text-white"
        type="button">Feedback</button>
      </ServoiceFeedback>
    </div>
  );
}

export default Feedback;
