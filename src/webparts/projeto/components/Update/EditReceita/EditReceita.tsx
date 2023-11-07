import * as React from "react";
import { IEditReceitasProps } from "./IEditReceitaProps";
import { Dialog, DialogBody, DialogSurface, DialogTitle, DialogTrigger, Button, DialogContent, Combobox, Field, Switch, Option, Input, typographyStyles, tokens, makeResetStyles, makeStyles, InputProps, ComboboxProps, DialogActions } from "@fluentui/react-components";
import { Dismiss24Regular, Image24Regular } from '@fluentui/react-icons';
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { IReceitas } from "../../../interfaces/IReceitas";
import ListSP from "../../../../../shared/services/List.service";


const useStackClassName = makeResetStyles({

    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingHorizontalS

});

const useStyles = makeStyles({
    description: {
      ...typographyStyles.caption1,

    }
});

const EditReceita: React.FunctionComponent<IEditReceitasProps> = (props) => {
    
    const spList = new ListSP();
    const styles = useStyles();

    const [nomeReceita, setNomeReceita] = React.useState('teste');
    const onChangeNomeReceita: InputProps["onChange"] = (ev, data) => {
            setNomeReceita(data.value);
      };
    
    const [selectedTipoReceita, setSelectedTipoReceita] = React.useState<string[]>([]);
    const onSelectedTipoReceita: ComboboxProps["onOptionSelect"] = (ev, data) => {
        setSelectedTipoReceita(data.selectedOptions);
        console.log(selectedTipoReceita)
      };

    const [receitaCara, setReceitaCara] = React.useState(false);
    const onChangeReceitaCara = React.useCallback(
        (ev) => {
            setReceitaCara(ev.currentTarget.checked);
        },[setReceitaCara]
      );

    const [dataReceita,setDataReceita] = React.useState<Date>(new Date())

    const [fileReceita, setFileReceita] = React.useState<{name:any; content:string | ArrayBuffer | null;}>();
    function addFile(event:any){
        let resultFile = event.target.files;
        for(let i = 0; i < resultFile.length; i++){
          var file = resultFile[i];
          var reader = new FileReader();
          reader.onload = (function(file) {
              return function(e) {  
                  setFileReceita({
                    name: file.name,
                    content: e.target!.result
  
                })
              }
          })(file)
          reader.readAsArrayBuffer(file)
        }
        console.log(fileReceita)
    }
    
    const [open,setOpen] = React.useState(false);
    const [trocaAnexo,setTrocaAnexo] = React.useState(false);

    React.useEffect(()=>{
        setOpen(props.openDialog);
        if(props.item && props.openDialog){
            setNomeReceita(props.item.Title);
            setSelectedTipoReceita([props.item.TipoReceita!]);
            setReceitaCara(props.item.Cara!);
            setDataReceita(new Date(props.item.DataTentativaString!))
        }
    },[props.openDialog])


    function close(){
        setOpen(false)
        const receita:IReceitas ={
            Title:nomeReceita,
            TipoReceita:selectedTipoReceita[0] ? selectedTipoReceita[0] :"",
            Cara:receitaCara,
            DataTentativaString: dataReceita.toDateString(),
            Anexo:props.item.Anexo
        }
        props.closeDialog(false, receita)
    }

    function habilitaTrocaDeAnexo(habilitaTroca:boolean){
        setTrocaAnexo(habilitaTroca)
        if(habilitaTroca == false){
            setFileReceita(null!)
        }
    }

    async function editarReceita(){
        if(verificaCampos()){
            const receita:IReceitas = {
                Title:nomeReceita,
                TipoReceita:selectedTipoReceita[0]? selectedTipoReceita[0]:"",
                Cara:receitaCara,
                DataTentativa:dataReceita
            }
            await spList.EditList(props.receitaList, props.item.ID!, receita).then((result:any)=>{
                if(fileReceita && fileReceita.name){
                    if(trocaAnexo){
                        spList.DeleteAttachmentList(props.receitaList,props.item.ID!,props.item.Anexo).then((result:any)=>{
                            spList.PostAttachmentList(props.receitaList, props.item.ID!, fileReceita).then((result:any)=>{
                                if(result.status && result.status !== 200){
                                    alert('Erro durante a mudança de anexos.')
                                }else{
                                    alert('Item atualizado com sucesso.')
                                }
                            })
                        })
                    }else{
                        spList.PostAttachmentList(props.receitaList, props.item.ID!, fileReceita).then((result:any)=>{
                            if(result.status && result.status !== 200){
                                alert('Erro durante a inserção de anexos.')
                            }else{
                                alert('Item atualizado com sucesso.')
                            }
                        })
                    }
                }else{
                    alert('Item Atualizado com sucesso')
                }
            }).catch((err:any)=>{
                alert(err)
            })
        }
    }

    function verificaCampos(){
        if(nomeReceita == "" || nomeReceita == null ){
            alert('Erro ao editar a receira, o campo "Nome da Receita" está vazio.')
            return false
        }
        return true
    }
    return(
        <Dialog modalType="alert" open={open} onOpenChange={() => close()}>
            <DialogSurface>
                <DialogBody>
                <DialogTitle action={
                    <DialogTrigger action="close">
                        <Button appearance="subtle"
                                aria-label="close"
                                icon={<Dismiss24Regular/>}
                        />
                    </DialogTrigger>
                }>Edição da Receita</DialogTitle>
                <DialogContent>
        <div className={useStackClassName()}>
            <Field label="Receita" required>
                <Input style={{minWidth:100}} value={nomeReceita} onChange={onChangeNomeReceita}/>
            </Field>
            <Field label = "Tipo de Receita" required >
                <Combobox onOptionSelect={onSelectedTipoReceita} style={{minWidth:100}} defaultValue={selectedTipoReceita[0]}>
                    <Option text="Entrada" value="Entrada">Entrada</Option>
                    <Option text="Principal" value="Principal">Principal</Option>
                    <Option text="Bebida" value="Bebida">Bebida</Option>
                    <Option text="Sobremesa" value="Sobremesa">Sobremesa</Option>
                </Combobox>
            </Field>
        </div>
        <div className={useStackClassName()}>
            <Field label="A Receita é Cara?" style={{ userSelect: 'none'}}>
            <Switch
                checked={receitaCara}
                onChange={onChangeReceitaCara}
                label={receitaCara ? "Sim" : "Não"}/>
                <span className={styles.description}>
                    {receitaCara ? "IMPAGAVÉÉÉL": "Ok"}
                </span>
            </Field>
        </div>
        <div className={useStackClassName()}>
            <Field label="Data de que tentou a receita">
            <DatePicker
                value={dataReceita}
                onSelectDate={(data:Date) => {setDataReceita(data)}}
                placeholder="Select a date..."
                />
            </Field>
        </div>
        <div className={useStackClassName()}>
                <Field label="Imagem da Receita">
                    {props.item && props.item.Anexo.length>=1 &&
                    <Button appearance="secondary" onClick={()=>habilitaTrocaDeAnexo(!trocaAnexo)}>{trocaAnexo && "Cancelar troca de anexo da receita"}{!trocaAnexo && "Troca de anexo da receita"}</Button>}
                    {props.item && props.item.Anexo.length == 0 &&
                    <input type="file" id="inputFile" onChange={addFile.bind(this)} />}
                    {props.item && props.item.Anexo.length> 0 && trocaAnexo &&
                    <React.Fragment><br/><input type="file" id="inputFile" onChange={addFile.bind(this)}></input></React.Fragment>}
                    {props.item && props.item.Anexo >= 1 &&
                    <React.Fragment><br/><label>Anexo já Cadastrado</label></React.Fragment>}
                    {props.item && props.item.Anexo.map((file:any)=>{
                        return <p><Image24Regular/>{file.FileName}</p>
                    })}
                </Field>
            </div>
                </DialogContent>
                <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                        <Button appearance="primary" onClick={editarReceita}>Atualizar</Button>
                    </DialogTrigger>
                </DialogActions>
                </DialogBody>
            </DialogSurface>

        </Dialog>
    )

}

export default EditReceita