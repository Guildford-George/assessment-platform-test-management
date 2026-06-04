class Helpers {
    static checkIsSystem(organizationId: string){
        const systemId= process.env["SYSTEM_ID"]
        return systemId?organizationId===systemId : false
    }

}

export default Helpers