import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';
import Header from 'editorjs-header-with-alignment'
import Paragraph from 'editorjs-paragraph-with-alignment';
import NestedList from '@editorjs/nested-list';
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import styled from 'styled-components';
import { blocksService } from '../services/blocksService';


export default function Block({selectedBlock, updateBlocks, setUpdateBlocks}){
    const ejInstance = useRef();
    const { updateBlock } = blocksService();

    useEffect(() => {
      if (ejInstance.current === null) {
        initEditor();
      }
      setUpdateBlocks(!updateBlocks)
      return () => {
        ejInstance?.current?.destroy();
        ejInstance.current = null;
      };
    }, [selectedBlock]);

    const DEFAULT_INITIAL_DATA =  {
      "time": new Date().getTime(),
      "blocks": selectedBlock.block.block
  }

    const initEditor = () => {
        const editor = new EditorJS({
           holder: 'editorjs',
           onReady: () => {
             ejInstance.current = editor;
             setUpdateBlocks(!updateBlocks)
           },
           autofocus: true,
           data: DEFAULT_INITIAL_DATA,
           onChange: async () => {
             let content = await editor.saver.save();
             await updateBlock(selectedBlock._id, {
              block: content.blocks,
              title: selectedBlock.block.title
             }, );
           },
           tools: { 
            header: Header,
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
            },
            image: SimpleImage,
            list: {
              class: NestedList,
              inlineToolbar: true,
              config: {
                defaultStyle: 'unordered'
              },
            },
            embed: {
              class: Embed,
              inlineToolbar: true,
              config: {
                services: {
                  youtube: true,
                  coub: true
                }
              }
            },
            },
         }
        );
       };

    return(
            <Content id="editorjs" className='prose'></Content>
    )
    
}

const ContainerEditor = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 12px;
`

const Content = styled.div`
  padding: 8px;
  flex: 1;
  margin: 0 auto;
  font-family: 'Lora', sans-serif;

`