import axios from 'axios';

const CYCLES_TO_REPAIR = [];


//https://tagging-service.versatile.ai/tagging/1651571/assign?sessionid=uh6nv51ovmdjxjry0naluqlmgogfoi02

const BASE_URL =  "https://tagging-service.versatile.ai/tagging";
const SESSION_ID = "uh6nv51ovmdjxjry0naluqlmgogfoi02";

(async () => {

    for (const cycleId of CYCLES_TO_REPAIR) {
        //@ts-ignore
        //const {cycleTaggingInfo} = await axios.put(`${BASE_URL}/tagging/${cycleId}/?sessionid=${SESSION_ID}`, {"userId":141})


        //https://tagging-service.versatile.ai/tagging/1651571/assign?sessionid=uh6nv51ovmdjxjry0naluqlmgogfoi02
    }

})();
