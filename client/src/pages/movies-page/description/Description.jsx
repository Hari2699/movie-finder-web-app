import React from 'react';

import classes from './Description.module.css';

import {Container,Row,Col} from 'react-bootstrap';
import CommaSeperatedText from '../../../components/comma-separated-text/CommaSeperatedText';


function Description({ story, directors, writers, stars }){ 

    return(
         <Container className={ classes.descriptionBox }>
             <Row className={ classes.description }>
             <p>{ story }</p>
             </Row>
             {directors.length > 0 ? (
                <Row className={ classes.descBox }>
                    <Col lg={2} xs={5} className={ classes.field }>DIRECTORS</Col>
                    <Col lg={1} xs={1} className={ classes.field }></Col>
                    <Col lg={9} xs={12} className={ classes.value }>
                    <CommaSeperatedText textArray={directors} />
                 </Col>
             </Row>
             ) : null}
             {writers.length > 0 ? (
                <Row className={ classes.descBox }>
                    <Col lg={2} xs={5} className={ classes.field }>WRITERS</Col>
                    <Col lg={1} xs={1} className={ classes.field }></Col>
                    <Col lg={9} xs={10} className={ classes.value }>
                    <CommaSeperatedText textArray={writers} />
                 </Col>
             </Row>
            ) : null}
            {stars.length > 0 ? (
                <Row className={ classes.descBox }>
                    <Col lg={2} xs={5} className={ classes.field }>STARS</Col>
                    <Col lg={1} xs={1} className={ classes.field }></Col>
                    <Col lg={9} xs={10} className={ classes.value }>
                    <CommaSeperatedText textArray={stars} />
                 </Col>
                </Row>
            ) : null}
         </Container>
    ) ;
 }
 export default Description;