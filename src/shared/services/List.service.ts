import { sp } from "@pnp/pnpjs";
import { IGeneralProps } from "../interfaces/IGeneralProps";
import { IReceitas } from "../../webparts/projeto/interfaces/IReceitas";

export default class ListSP {

    public async GetList(idList:string, fields:Array<string>, expand:Array<string>=[''], orderBy:string="ID"):Promise<IGeneralProps> {
        
        const searchFields = fields.join(',');
        const searchExpand = expand.join(',');
        
        const search:IGeneralProps = await sp.web.lists.getById(idList).items.select(searchFields).expand(searchExpand).orderBy(orderBy).get()
        .then((data:IGeneralProps) =>{return data;})
        .catch((err:IGeneralProps) => {return err.message;})

        return search;



    }

    public async PostList(idList:string,fields:IReceitas):Promise<IGeneralProps>{
        const insert:IGeneralProps = await sp.web.lists
        .getById(idList).items
        .add(fields)
        .then((data:IGeneralProps)=>{return data;})
        .catch((err:IGeneralProps)=>{return err;})

        return insert;
    }
    public async PostAttachmentList(idList:string,idItem:number,fileProps:any):Promise<IGeneralProps>{

        const item:IGeneralProps = await sp.web.lists.getById(idList).items.getById(idItem);
        const insert:IGeneralProps = await item.attachmentFiles.add(fileProps.name,fileProps.content)
        .then((data:IGeneralProps)=>{return data;})
        .catch((err:IGeneralProps)=>{return err;})

        return insert;

    }

}