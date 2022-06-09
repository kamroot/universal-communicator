
#  Nhadro - Let's Talk

##  Description
This is an exploration of how to build a communication app using SignalWire. We'll build a web-based app with the following ways of communicating with each ohter

- make phone calls (PSTN) to any phone number in the world
- Send SMS/MMS to any phone number in the world
- Make browser to browser calls to another person that is logged into the app  

##  Tech stack
The entire codebase is in Typescript.

###  UI / Frontend
ReactJS with context API for state management

#### Important npm packages used
- google login 

###  Application server
The *application server* is in NextJS. It exposes a set of RESTful API endpoints (listed below) as well as use socket.io (websockets) for real-time push notifications.

####  Endpoints
| Endpoint | Verb | Description |
| / | GET | Simple endpoint to test if the app server is up and running or not |
| /v1/users | GET | get a list of all users |
| /v1/users | POST | Add a new user. Needs name and email in teh body |

####  Socket.io / WebSocket 
Server is listening for events marked channel-info 

###  Data persistence layer
Nothing right now

## Providers 
- SignalWire for SMS, MMS, Voice and Video 
- Getstream.io for chat 

##  Roadmap
- [ ] UI reorg with hard coded users, 
- [ ] find ways to allow people to create their own channels with either audio only, chat only or audio-video and chat in one channel
- [ ] Deployment 
- [ ] use real users instead of fake users
- [ ] allow users to be logged in for more than 15 min
- [ ] invite someone to a audio, video or chat channel via (a) browser notifications, (b) or (c) email
- [ ] allow chatting in audio or video channels 
- [ ] convert from audio channel to video or any direction
- [ ] show presence of users 
- [ ] allow users to set their profile pictures
- [ ] allow user to set their prefences to show whether they want to be contacted via chat, audio or video
- [ ] invite other people in a channel where two people are already present 
- [ ] audio or video messages (not live)
- [ ] real-time or post-meeting transcriptions and translations
- [ ] invite external users to join the app 
  

##  What's with the name?
`Nhadro` means **Let's Talk** in the **darija** langunage which is spoken in Morocco. Our lead contributor, *Aya* is from Morocco and she suggested this name. We feel this is appropriate for what this project is about.
