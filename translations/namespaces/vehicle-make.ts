const vehicleMake= {
    title:"Vehicle makes",
    columns: {
        name:"Name"
    },
    addMake: "Add vehicle make",
    dialog:{
        add_title: "Add vehicle make",
        update_title: "Update vehicle make",
        fields:{
            name:"Name"
        } 
            
    }
}


export type VehicleMakeNameSpace = typeof vehicleMake;
export default vehicleMake;