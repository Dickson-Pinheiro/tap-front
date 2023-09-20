import { useState } from "react";
import styled from "styled-components";

export default function Accordion({title, children}) {
    const [opened, setOpened] = useState(false);
    return (
        <ContainerAccordion>
            <h1 onClick={() => setOpened(!opened)}><span>{opened ? "- " : "+ "}</span>{title}</h1>
            <ContentAccordionWrapper opened={opened}>
                {children}
            </ContentAccordionWrapper>
        </ContainerAccordion>
    )
}

const ContainerAccordion = styled.div`
    width: 100%;
    max-width: 500px;
`

const ContentAccordion = styled.div`
`

const ContentAccordionWrapper = styled(ContentAccordion).attrs(props => ({
    style: {
    transition: '200ms',
    minHeight: props.opened ? '20px' : "0px",
    overflow: 'hidden',
    backgroundColor: 'red',
    height: props.opened ? "auto": "0px",
    }
}))`
`