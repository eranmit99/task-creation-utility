import axios from 'axios';
import {createConnection, Connection, ConnectionOptions} from "mysql2";
import * as fs from 'fs';

enum Environments {
    Production = "production",
    Staging = "staging"
}

type PermutationData = {
    loadTypes: number[],
    processTypes: number[]
}

class CTSAgent {
    private BASE_CREATE_PAYLOAD: any = {
        "userId": 141,
        "from": "2022-08-28T07:21:10.000Z",
        "to": "2022-08-28T07:26:35.000Z",
        "siteId": 10000142,
        "craneId": 10000313,
        "deviceId": 100523
    }
    private BASE_UPDATE_PAYLOAD: any = {
        "userId": 141,
        "wizardState": {
            "containsMissingProduct": [false, false],
            "isBreakEnabled": false,
            "forceDirectToProduct": false,
            "currentWizardStage": "product",
            "dropLocationsMode": "product",
            "loadType": {
                "value": [{
                    "category": {"value": 21, "label": "General Finishing Materials", "is_deleted": 0},
                    "id": 10,
                    "value": 10,
                    "label": "Bomb Shelter Window",
                    "is_deleted": 0,
                    "productTypeIds": [],
                    "photos": ["https://tcc-catalog-images.s3.us-east-2.amazonaws.com/10_1.jpg", "https://tcc-catalog-images.s3.us-east-2.amazonaws.com/10_2.jpg", "https://tcc-catalog-images.s3.us-east-2.amazonaws.com/10_3.jpg", "https://tcc-catalog-images.s3.us-east-2.amazonaws.com/10_4.jpg"]
                }], "suggestionEntityIds": []
            },
            "processType": {
                "value": [{
                    "value": 3,
                    "label": "Installation",
                    "is_deleted": 0,
                    "category": {"value": 1, "label": "Direct to Product", "is_deleted": 0}
                }, {
                    "value": 2,
                    "label": "Unloading",
                    "is_deleted": 0,
                    "category": {"value": 3, "label": "Other", "is_deleted": 0}
                }],
                "addList": [2],
                "removeList": [],
                "processTypeBlacklist": [84, 9, 10],
                "processTypeWhitelist": [1, 2, 3, 4, 6, 7, 8, 9, 10, 83, 84, 87, 89, 90, 91, 92],
                "processCategoryBlacklist": [2, 3, 4, 6],
                "processCategoryWhitelist": [],
                "selectedProcessCategories": [1]
            },
            "craneTags": {"value": []},
            "pickLocationsMode": "product",
            "siteLocationsPick": {
                "value": [{
                    "location": [{
                        "lat": 32.71451644287224,
                        "lng": -117.1721732134794
                    }, {"lat": 32.714516211805844, "lng": -117.17128729772685}, {
                        "lat": 32.71368344197543,
                        "lng": -117.17128760896405
                    }, {"lat": 32.713683673063926, "lng": -117.17217351309586}, {
                        "lat": 32.71451644287224,
                        "lng": -117.1721732134794
                    }],
                    "buildingGuid": null,
                    "buildingType": "Office",
                    "buildingValue": "2B - Tower",
                    "floorType": null,
                    "floorValue": null,
                    "mmsType": "Building",
                    "deletedAt": null,
                    "ifcGuid": "0ZBkiHo5HAiQnvEWoNMNFu",
                    "topAlt": 95.4688,
                    "bottomAlt": 3.05276,
                    "isDeleted": false,
                    "area": 7692.155763159721,
                    "value": 25066,
                    "label": "Superstructure 2B",
                    "type": 22,
                    "typeLabel": "Building",
                    "isOperational": 0,
                    "isProduct": 1,
                    "parent": null,
                    "zIndex": 19
                }, {
                    "location": [{"lat": 32.71451644287224, "lng": -117.1721732134794}, {
                        "lat": 32.714516211805844,
                        "lng": -117.17128729772685
                    }, {"lat": 32.714076827240376, "lng": -117.17128746166429}, {
                        "lat": 32.71407704181579,
                        "lng": -117.17217337282824
                    }, {"lat": 32.71451644287224, "lng": -117.1721732134794}],
                    "buildingGuid": "0ZBkiHo5HAiQnvEWoNMNFu",
                    "buildingType": "Office",
                    "buildingValue": "2B - Tower",
                    "floorType": null,
                    "floorValue": null,
                    "mmsType": "Area",
                    "deletedAt": null,
                    "ifcGuid": "1XVbHSwq1BYRgZOGve1NRN",
                    "topAlt": 95.4688,
                    "bottomAlt": 3.05276,
                    "isDeleted": false,
                    "area": 4058.605169600225,
                    "value": 25124,
                    "label": "North Area",
                    "type": 23,
                    "typeLabel": "Area",
                    "isOperational": 0,
                    "isProduct": 1,
                    "parent": 22,
                    "zIndex": 84
                }, {
                    "location": [{"lat": 32.71451644287224, "lng": -117.1721732134794}, {
                        "lat": 32.714516211805844,
                        "lng": -117.17128729772685
                    }, {"lat": 32.71368344197543, "lng": -117.17128760896405}, {
                        "lat": 32.713683673063926,
                        "lng": -117.17217351309586
                    }, {"lat": 32.71451644287224, "lng": -117.1721732134794}],
                    "buildingGuid": "0ZBkiHo5HAiQnvEWoNMNFu",
                    "buildingType": "Office",
                    "buildingValue": "2B - Tower",
                    "floorType": "Floor 1 (2B)",
                    "floorValue": "1",
                    "mmsType": "Floor",
                    "deletedAt": null,
                    "ifcGuid": "23h1Y5K0TC2xGnpDJXP91i",
                    "topAlt": 10.2679,
                    "bottomAlt": 3.6957,
                    "isDeleted": false,
                    "area": 7692.155763159721,
                    "value": 25079,
                    "label": "Floor 1",
                    "type": 19,
                    "typeLabel": "Floor",
                    "isOperational": 0,
                    "isProduct": 1,
                    "parent": 22,
                    "zIndex": 20
                }], "suggestionEntityIds": []
            },
            "siteLocationsDrop": {
                "value": [{
                    "location": [{
                        "lat": 32.713555487990966,
                        "lng": -117.17279558730625
                    }, {"lat": 32.713555444129454, "lng": -117.17261849972988}, {
                        "lat": 32.712972402475295,
                        "lng": -117.17261870738955
                    }, {"lat": 32.71297242982237, "lng": -117.17279579687286}, {
                        "lat": 32.713555487990966,
                        "lng": -117.17279558730625
                    }],
                    "buildingGuid": "0ZBkiHo5HAiQnvEWoNMN8h",
                    "buildingType": "Parking",
                    "buildingValue": "3A - Parking",
                    "floorType": null,
                    "floorValue": null,
                    "mmsType": "Area",
                    "deletedAt": null,
                    "ifcGuid": "0ZU3RHO5z79A4s_cuhQwn1",
                    "topAlt": 3.06229,
                    "bottomAlt": -24.6114,
                    "isDeleted": false,
                    "area": 1076.5488542887633,
                    "value": 25153,
                    "label": "Deck Pour #2",
                    "type": 23,
                    "typeLabel": "Area",
                    "isOperational": 0,
                    "isProduct": 1,
                    "parent": 22,
                    "zIndex": 113
                }, {
                    "location": [{"lat": 32.713555490929664, "lng": -117.1727999698929}, {
                        "lat": 32.713555317513936,
                        "lng": -117.172129378528
                    }, {"lat": 32.71243730312741, "lng": -117.17212978626348}, {
                        "lat": 32.7124374518062,
                        "lng": -117.17280036886397
                    }, {"lat": 32.713555490929664, "lng": -117.1727999698929}],
                    "buildingGuid": null,
                    "buildingType": "Parking",
                    "buildingValue": "3A - Parking",
                    "floorType": null,
                    "floorValue": null,
                    "mmsType": "Building",
                    "deletedAt": null,
                    "ifcGuid": "0ZBkiHo5HAiQnvEWoNMN8h",
                    "topAlt": 3.06229,
                    "bottomAlt": -24.6114,
                    "isDeleted": false,
                    "area": 7817.109603268784,
                    "value": 25068,
                    "label": "Parking 3A",
                    "type": 22,
                    "typeLabel": "Building",
                    "isOperational": 0,
                    "isProduct": 1,
                    "parent": null,
                    "zIndex": 17
                }, {
                    "location": [{"lat": 32.713555490929664, "lng": -117.1727999698929}, {
                        "lat": 32.713555317513936,
                        "lng": -117.172129378528
                    }, {"lat": 32.71243730312741, "lng": -117.17212978626348}, {
                        "lat": 32.7124374518062,
                        "lng": -117.17280036886397
                    }, {"lat": 32.713555490929664, "lng": -117.1727999698929}],
                    "buildingGuid": "0ZBkiHo5HAiQnvEWoNMN8h",
                    "buildingType": "Parking",
                    "buildingValue": "3A - Parking",
                    "floorType": "Floor -2 (3A)",
                    "floorValue": "-2",
                    "mmsType": "Floor",
                    "deletedAt": null,
                    "ifcGuid": "2VfkZHWI514AnenYv4FHau",
                    "topAlt": -1.91954,
                    "bottomAlt": -5.76217,
                    "isDeleted": false,
                    "area": 7817.109603268784,
                    "value": 25098,
                    "label": "Floor -2",
                    "type": 19,
                    "typeLabel": "Floor",
                    "isOperational": 0,
                    "isProduct": 1,
                    "parent": 22,
                    "zIndex": 16
                }]
            },
            "siteProducts": {
                "value": [[{
                    "location": [{
                        "lat": 32.71355612564555,
                        "lng": -117.17279558747971
                    }, {"lat": 32.713555952854485, "lng": -117.17212858539081}, {
                        "lat": 32.71243711940114,
                        "lng": -117.17212899432099
                    }, {"lat": 32.71243729219001, "lng": -117.17279598794376}, {
                        "lat": 32.71355612564555,
                        "lng": -117.17279558747971
                    }],
                    "floorGuid": "2Veo2ZZVf3tf4uo93NsdR1",
                    "buildingGuid": "0ZBkiHo5HAiQnvEWoNMN8h",
                    "deletedAt": null,
                    "type": 1037,
                    "topAlt": -4.5847,
                    "bottomAlt": -6.11851,
                    "isDeleted": false,
                    "area": 7780.880931152714,
                    "ifcGuid": "3fKmb859z2DgTPH9S11ClL",
                    "value": 2947455,
                    "label": "SL-004",
                    "zIndex": 5,
                    "probabilityInfo": {
                        "likelihood": "NOT_AVAILABLE",
                        "messages": [],
                        "counts": [],
                        "productId": 2947455,
                        "productName": "SL-004"
                    }
                }]]
            },
            "steps": {
                "value": [{
                    "id": 8565469,
                    "pick": 2207063,
                    "endTime": "2022-08-28T07:54:13.000Z",
                    "stepNum": 1,
                    "startTime": "2022-08-28T06:54:22.000Z"
                }, {
                    "id": 8565474,
                    "pick": 2207063,
                    "endTime": "2022-08-28T07:54:13.000Z",
                    "stepNum": 2,
                    "startTime": "2022-08-28T07:54:13.000Z"
                }, {
                    "id": 8565475,
                    "pick": 2207063,
                    "endTime": "2022-08-28T07:54:13.000Z",
                    "stepNum": 3,
                    "startTime": "2022-08-28T07:54:13.000Z"
                }, {
                    "id": 8565476,
                    "pick": 2207063,
                    "endTime": "2022-08-28T07:54:13.000Z",
                    "stepNum": 4,
                    "startTime": "2022-08-28T07:54:13.000Z"
                }]
            },
            "loadTypeIds": {"value": [28]},
            "processTypeIds": {"value": [7]}
        }
    }

    constructor(private baseUrl: string, private sessionId = "uh6nv51ovmdjxjry0naluqlmgogfoi02") {}

    async createCycle(): Promise<{ cycleId: string, wizardState: any }> {
        try {
            const response = await axios.post(`${this.baseUrl}/tagging?sessionid=${this.sessionId}`, this.BASE_CREATE_PAYLOAD)
            return response.data;
        } catch (err) {
            throw Error("Failed to create test cycle");
        }
    }

    async deleteCycle(cycleId: string) {
        // @ts-ignore
        return axios.delete(`${this.baseUrl}/tagging/${cycleId}?sessionid=${this.sessionId}`, {data: {userId: this.BASE_CREATE_PAYLOAD.userId}});
    }

    generateUpdateObject(wizardState: any, loadTypeAndProcessTypeData: PermutationData) {
        const updateObject = JSON.parse(JSON.stringify(this.BASE_UPDATE_PAYLOAD));
        updateObject.wizardState.steps = wizardState.steps;
        updateObject.wizardState.loadTypeIds = {"value": loadTypeAndProcessTypeData.loadTypes};
        updateObject.wizardState.processTypeIds = {"value": loadTypeAndProcessTypeData.processTypes};

        return updateObject
    }

    async updateCycleData(cycleId: string, wizardState: any, loadTypeAndProcessTypeData: PermutationData) {
        try {
            const updateObject = this.generateUpdateObject(wizardState, loadTypeAndProcessTypeData);
            const response = await axios.put(`${this.baseUrl}/tagging/${cycleId}/verify?sessionid=${this.sessionId}`, updateObject)
            return response.data;
        } catch (err) {
            throw Error("Failed to update cycle");
        }
    }
}

class PermutationBuilder {

    public loadTypesMap: Record<string, string>;
    public processTypesMap: Record<string, string>;

    constructor(private loadTypes: string[], private processTypes: string[]) {
        this.loadTypesMap = this.generateEntityMap(loadTypes);
        this.processTypesMap = this.generateEntityMap(processTypes);
    }

    private generateEntityMap(entityData: string[]): Record<string, string> {
        return entityData.reduce((map: Record<string, string>, item: string) => {
            const {id, name} = this.getEntityIdFromEntry(item);
            map[id] = name;
            return map
        }, {})
    }

    private getEntityIdFromEntry(dataEntry: string): { name: string, id: number } {
        const [name, idsString] = dataEntry.split(":");
        return {
            name,
            id: Number(idsString.split("#")[0])
        }
    }

    public generateTestMatrix(): PermutationData[] {
        const permutationList = [];
        for (const loadTypeString of this.loadTypes) {
            const {id: loadTypeId} = this.getEntityIdFromEntry(loadTypeString);

            for (const processString of this.processTypes) {
                const {id: processTypeId} = this.getEntityIdFromEntry(processString);
                const permutation: PermutationData = {
                    loadTypes: [],
                    processTypes: []
                };
                permutation.loadTypes.push(loadTypeId);
                permutation.processTypes.push(processTypeId);

                permutationList.push(permutation);
            }
        }
        return permutationList;
    }
}

class TaskComparisonService {

    private connection: Connection | null;
    private ctsAgent: CTSAgent | null;
    private perBuilder: PermutationBuilder | null;
    private COMPRESSING_QUERY: string;

    constructor(private env: Environments) {
        this.COMPRESSING_QUERY = "";
        this.connection = null;
        this.perBuilder = null;
        this.ctsAgent = null
    }

    public async init() {
        console.info("*************************************************************************")
        console.info("Initializing service", "start\n");

        console.info("      [1] Fetching configurations...")
        const rawConfigData = fs.readFileSync(`config.json`, {encoding: 'utf8', flag: 'r'});
        const {dbCredentials, cts} = JSON.parse(rawConfigData)[this.env];

        console.info("      [2] Initializing DB connection...");
        this.connection = await createConnection(dbCredentials);

        console.info("      [3] Initializing CTS agent...");
        this.ctsAgent = new CTSAgent(cts.url, cts.token);

        console.info("      [4] Fetching test compressing query...")
        this.COMPRESSING_QUERY = fs.readFileSync(`./inputs/compare-query.sql`, {encoding: 'utf8', flag: 'r'});

        console.info("      [5] Fetching test input...")
        const rawInputData = fs.readFileSync(`./inputs/input-data.json`, {encoding: 'utf8', flag: 'r'});
        const {LOAD_TYPE_ID_TO_CHECK, PROCESS_IDS_TO_CHECK} =  JSON.parse(rawInputData);
        this.perBuilder = new PermutationBuilder(LOAD_TYPE_ID_TO_CHECK, PROCESS_IDS_TO_CHECK);

        console.info("\nInitializing service", "success");
        console.info("*************************************************************************")
    }

    getEntityNameStringByIds(entityName: number[], map: Record<string, string>) {
        const nameList = entityName.map((id) => map[id]);
        return nameList.join(",");
    }

    public async executeRequestAndPersistDataToFile() {
        if (!this.perBuilder) {
            throw Error("Input params were now initialized properly");
        }
        if (!this.ctsAgent) {
            throw Error("CTS was not initialized properly");
        }
        const permutationData: PermutationData[] = this.perBuilder.generateTestMatrix();
        const results = [];
        let index = 1;

        for (const per of permutationData) {
            console.info(
                `------------------------------------------------------------------------
                    permutation ${index}/${permutationData.length}, 
                    load type: ${this.getEntityNameStringByIds(per.loadTypes, this.perBuilder.loadTypesMap)},
                    process type: ${this.getEntityNameStringByIds(per.processTypes, this.perBuilder.processTypesMap)}
            `);
            //console.log("creating cycle data...")
            const cycleId = await this.createCycleToCheck(per);

            await this.delay(1000);
            //console.log("executing DB call...")
            const DbCreationResults = await this.fetchCreationResultsFromDB(cycleId);
            results.push(DbCreationResults);

            //console.log("deleting cycle...");
            await this.ctsAgent.deleteCycle(cycleId);
            await this.delay(500);
            index++;
        }
        console.info(`*************************************************************************`)
        console.info(`Persisting all data to file...`)
        fs.writeFileSync(`./test-outputs/${this.env}.json`, JSON.stringify(results));

        console.info("Operation finished successfully");
    }

    private async fetchCreationResultsFromDB(cycleId: string) {
        if (this.connection) {
            const res = await this.connection.promise().execute(this.COMPRESSING_QUERY, [cycleId]);
            return res[0]
        }
        throw new Error("DB connection was not initialized")
    }

    private async createCycleToCheck(permutationData: PermutationData): Promise<string> {
        try {
            //@ts-ignore
            const {cycleId, wizardState} = await this.ctsAgent.createCycle();
            //@ts-ignore
            await this.ctsAgent.updateCycleData(cycleId, wizardState, permutationData);
            return cycleId;
        } catch (err) {
            console.error(err);
            throw new Error("There was an error creating cycle to check")
        }
    }

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}


/*YOU SHOULD RUN THIS IN ORDER TO MAKE IT WORK*/
(async () => {
    const taskComparison = new TaskComparisonService(Environments.Production);
    await taskComparison.init();

    const cycleData = await taskComparison.executeRequestAndPersistDataToFile();
})();


