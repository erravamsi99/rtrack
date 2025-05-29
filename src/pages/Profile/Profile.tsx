import React, { useState } from 'react';
import {Button} from "react-bootstrap";

const Profile: React.FC = () => {
  const [bio, setBio] = useState<string>('');

  const username = 'John Doe';
  const email = '7k4o1@example.com';

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
      <div className="bio-section">
        <h2>Bio</h2>
        <textarea
          value={bio}
          onChange={handleBioChange}
          placeholder="Tell us about yourself..."
        />
      </div>
      <div className="bio-preview">
        <h3>Bio Preview</h3>
        <p>{bio || 'No bio yet.'}</p>
      </div>

      <div>
        <Button variant="primary">Primary</Button>
        {[1,2,3,4,5,6,7].map(k => (
          <div key={k} style={{marginTop: 20}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam ex ipsum mollitia perspiciatis placeat
            provident sequi temporibus. Deleniti dicta excepturi magni necessitatibus non, nulla, odio odit omnis quod
            saepe sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos dolor et fugiat id molestiae
            nobis optio vel! Ab deleniti esse fuga impedit laborum, magni minus molestiae nulla quaerat saepe? At.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis eaque hic nulla perspiciatis quaerat!
            Animi architecto asperiores cumque doloribus explicabo facilis id, laudantium officiis optio pariatur
            perspiciatis placeat suscipit ullam! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            beatae maxime nam omnis quidem. Ipsum itaque, sapiente? Aspernatur autem consectetur dolore eligendi eveniet id,
            maxime obcaecati optio quidem, reiciendis sapiente?
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;