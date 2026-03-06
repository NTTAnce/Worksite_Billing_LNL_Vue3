//import {createApp} from "vue";
//const EventBus = new createApp();

//export default EventBus;
import mitt from 'mitt';

const EventBus = mitt();

export default EventBus;