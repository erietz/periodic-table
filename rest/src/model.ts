import mongoose from "mongoose";

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
    data: {
        [key: string]: {
            [key: string]: string
        }
    }[]
};

const TableSchema = new mongoose.Schema<Table>({
    name: { type: String, required: true },
    data: [
        {
            type: mongoose.SchemaTypes.Mixed
        }
    ]
});

const TableModel = mongoose.model<Table>("PeriodicTable", TableSchema);

export async function saveTable(): Promise<any> {
    const doc = new TableModel({
        name: "Initial Test Table",
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

