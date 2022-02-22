import mongoose from "mongoose";
import util from "util";

const db = mongoose.connection;
// connection string on port 27017 using database named periodicTable
const connectionURL = "mongodb://localhost:27017/periodicTable";

// connect to the db
mongoose.connect(connectionURL);

// adds a one timed listener event for the event named "foo"
db.once("foo", () => {
    console.log(`Connected to MongoDb using mongoose at ${connectionURL}`);
});

export interface Table {
    name: string,
    date: Date,
    data: {
        [key: string]: {
            [key: string]: string
        }
    }[]
};

const TableSchema = new mongoose.Schema<Table>(
    {
        name: { type: String, required: true },
        date: { type: Date, required: true },
        data: [
            {
                type: Map,
                of: {
                    type: String
                },
                validate: (map: Map<string, string>) => {
                    const requiredValues: string[] = [];
                    const regex = /col\d+/;

                    for (const [key, value] of map.entries()) {
                        if (regex.test(key) == false) {
                            throw new Error(`Key must be of the form ${regex}`);
                        }
                        requiredValues.push(value);
                    }

                    for (const obj of requiredValues) {
                        for (const key of ["AtomicNumber", "GroupBlock"]) {
                            if (Object.keys(obj).length > 0 && !(obj.hasOwnProperty(key))) {
                                throw new Error(`Required key: ${key} is missing from ${util.inspect(obj)}`);
                            }
                        }
                    }
                }
            }
        ]
    },
    { minimize: false }
);

const TableModel = mongoose.model<Table>("PeriodicTable", TableSchema);

export async function saveTable(): Promise<any> {
    const doc = new TableModel({
        name: "Initial Test Table",
        date: new Date(),
        data: [
            {
                "col1": {
                    "AtomicNumber":"1",
                    "Symbol":"H",
                    "Name":"Hydrogen",
                    "AtomicMass":"1.0080",
                    "CPKHexColor":"FFFFFF",
                    "ElectronConfiguration":"1s1",
                    "Electronegativity":"2.2",
                    "AtomicRadius":"120",
                    "IonizationEnergy":"13.598",
                    "ElectronAffinity":"0.754",
                    "OxidationStates":"+1, -1",
                    "StandardState":"Gas",
                    "MeltingPoint":"13.81",
                    "BoilingPoint":"20.28",
                    "Density":"0.00008988",
                    "GroupBlock":"Nonmetal",
                    "YearDiscovered":"1766"
                },
                "col2": {},
                "col3": {},
                "col4": {}
            }
        ]
    });

    return doc.save();
}

export async function getTables(filter: object, projection: string): Promise<Table[]> {
    const query = TableModel.find(filter, projection)
        .select(projection)
    return query.exec();
}

