import { sp } from "@pnp/pnpjs";
import { IGeneralProps } from "../interfaces/IGeneralProps";

export default class ListSP {

    public async GetList(idList:string, fields:Array<string>, expand:Array<string>=[''], orderBy:string="ID"):Promise<IGeneralProps> {
        
        const searchFields = fields.join(',');
        const searchExpand = expand.join(',');
        
        const search:IGeneralProps = await sp.web.lists.getById(idList).items.select(searchFields).expand(searchExpand).orderBy(orderBy).get()
        .then((data:IGeneralProps) =>{return data;})
        .catch((err:IGeneralProps) => {return err.message;})

        return search;



    }

}