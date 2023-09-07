import * as React from 'react';
import { IContainerProps } from './iContainerProps';
import { FluentProvider, TabList, Tab, TabValue, SelectTabData, SelectTabEvent, makeStyles } from "@fluentui/react-components"
import { lightTheme } from '../../theme/Theme';
import ViewReceitas from '../View/Receita/Receitas';
import IncludeReceitas from '../Include/Receitas/Receitas';

const useStyles = makeStyles({
    centralizacao:{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignItems: "center"}
    });

const Container: React.FunctionComponent<IContainerProps> = (props) => {

    const styles = useStyles();
    // Define em qual aba o usuario vai comecar
    const [selectedTab, setSelectedTab] = React.useState<TabValue>("tabVisualizacao")

    // Responsavel por mudar a Tab conforme o clique do usuário
    const onTabSelected = (event: SelectTabEvent, data:SelectTabData): void => {
        setSelectedTab(data.value)
    }


    return(
        <FluentProvider theme={lightTheme} className={styles.centralizacao}>
            <TabList defaultSelectedValue={selectedTab} onTabSelect={onTabSelected}>
                <Tab value="tabVisualizacao">Visualização de Receita</Tab>
                <Tab value="tabCadastro">Cadastro de Receita</Tab>
            </TabList>
            <div >
                {/* Verifica se a tab selecionada é a de cadastro  */}
                { selectedTab === "tabCadastro" && <IncludeReceitas receitaIdList={props.idLista}/>}
                { selectedTab ==="tabVisualizacao" && <h1><ViewReceitas receitaIdList={props.idLista}>
                    
                    </ViewReceitas></h1>}
            </div>
        </FluentProvider>
    )
}

export default Container