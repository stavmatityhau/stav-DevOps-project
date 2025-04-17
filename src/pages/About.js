import React from 'react';
import myPhoto from '../assets/profile.png'; 
import jenkinsLogo from '../assets/jenkins.png';
import ansibleLogo from '../assets/ansible.png';
import dockerLogo from '../assets/docker.png';
import kubernetesLogo from '../assets/kubernetes.png';

function About() {
  return (
    <div>
      <h1>About Me</h1>
      <img src={myPhoto} alt="My Profile" style={{ width: '150px', borderRadius: '50%' }} />
      <h2>Stav Matityahu</h2>
      <h3>DevOps Engineer</h3>
      <p>Email: stav3434@gmail.com</p>
      <div style={{ marginTop: '20px' }}>
        <img src={jenkinsLogo} alt="Jenkins" style={{ width: '50px', margin: '10px' }} />
        <img src={ansibleLogo} alt="Ansible" style={{ width: '50px', margin: '10px' }} />
        <img src={dockerLogo} alt="Docker" style={{ width: '50px', margin: '10px' }} />
        <img src={kubernetesLogo} alt="Kubernetes" style={{ width: '50px', margin: '10px' }} />
      </div>
    </div>
  );
}

export default About;
