import React from 'react';
import {UnauthenticatedHeader} from "../../components/UnauthenticatedHeader";

const About: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const message = searchParams.get('message');

  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(() => {
    if (message) {
      setShowMessage(true);
    }
  }, [message]);

  const handleClose = () => setShowMessage(false);

  const Dialog = () => {
    return (
      <div className="dialog">
        <div className="dialog-content">
          <div className="dialog-header">
            <h2>Message</h2>
            <button className="dialog-close btn-close" onClick={handleClose}></button>
          </div>
          <div className="dialog-body">
            <p>{message}</p>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <UnauthenticatedHeader/>
      <div className="about">
        <section className="under-construction text-center py-5 d-flex flex-column gap-3">
          <h2>Page Under Construction</h2>
          <img src={`${process.env.REACT_APP_IMAGE_PATH}/banner/banner.jpg`} className="banner" alt="RighTrack"/>
          <p>
            We are currently working on building a better page for you. This page will be updated soon.
          </p>
          <p>
            In the meantime, please check out our social media channels for updates or reach out to us at
            <a href="mailto:hello@rightrack.in"> hello@rightrack.in</a>.
          </p>
        </section>
      </div>
      {showMessage && <Dialog/>}
    </>
  );
};

export default About;