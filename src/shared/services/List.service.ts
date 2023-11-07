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

    public async EditList(idList:string, idItem:number, itemEdit:any):Promise<IGeneralProps>{
        const item:IGeneralProps = sp.web.lists.getById(idList).items.getById(idItem);
        const update:IGeneralProps = await item.update(itemEdit).then((data:IGeneralProps)=>{return data;})
        .catch((err:IGeneralProps)=>{return err;});

        return update;
    }

    public async DeleteAttachmentList(idList:string, idItem:number, attachmentFiles:any){

        const item:IGeneralProps = sp.web.lists.getById(idList).items.getById(idItem);
        const attachmentNames = attachmentFiles.map((a:any)=>a.FileName);   
        await item.attachmentFiles.deleteMultiple(...attachmentNames).then((data:IGeneralProps)=>{return data;})
        .catch((err:IGeneralProps)=>{return err;});

    }

}