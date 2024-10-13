import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useAddTransactions } from '../../../hooks/useAddTransactions';
import { useGetTransactions } from '../../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import { useState } from "react";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebase-config';
import "./style.css";

export const ExpenseTracker = () => {
    const {addTransactions} = useAddTransactions();
    const {transactions, transTotal} = useGetTransactions();
    const {name, profilePhoto} = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDesciption] = useState("");
    const [transactionAmount, setTransactionAmout] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const {balance, income, expenses} = transTotal;

    const onSubmit = async (e) => {
        e.preventDefault();
        addTransactions({
            description, 
            transactionAmount, 
            transactionType
        });

        setDesciption("");
        setTransactionAmout("");
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <Container className="expenseTracker" fluid>
                <Row>
                <Col xs={12} md={10}>
                <Container> 
                    <h1> {name}'s Expense Tracker</h1>
                </Container>
                </Col>
                <Col xs={6} md={2}>
                {profilePhoto && 
                <Container className="profile">
                    <Image className="profilePhoto p-3" src={profilePhoto || <Spinner animation="border" />} roundedCircle/>
                    <Button className='SignOut' onClick={signUserOut}> Sign Out</Button>
                </Container>}
                </Col>
                </Row>
            </Container>
            <hr />
            <Container className="balance">
                <h3> Your Balance</h3>
                {balance >= 0 ? <h2>RM{balance}</h2> : <h2>-RM{balance*-1}</h2>}
            </Container>
            <Container className="summary">
                <Container className="income">
                    <h4> Income</h4>
                    <p>RM{income}</p>
                </Container>
                <Container className="expenses">
                <h4> Expenses</h4>
                <p>RM{expenses}</p>
                </Container>
            </Container>
            <hr className='horiLine'/>
            <Form className="addTransactions" onSubmit={onSubmit} >
                <Form.Group className="mb-3" >
                    <Row md={4}>
                        <Col>
                            <Form.Control 
                                size="lg"
                                type="number" 
                                placeholder="Amount" 
                                value={transactionAmount}
                                required onChange={(e) => setTransactionAmout(e.target.value)}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control 
                        size="lg"
                        type="text" 
                        placeholder="Description" 
                        value={description}
                        required onChange={(e) => setDesciption(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Stack direction="horizontal" gap={4}>
                        <Row md={4}>
                            <Col>
                                <Form.Check 
                                    size="lg" 
                                    type="radio" 
                                    id="expense" 
                                    value="expense" 
                                    checked={transactionType === "expense"}
                                    onChange={(e) => setTransactionType(e.target.value)}/>
                                <Form.Label htmlFor="expense"> Expense</Form.Label>
                            </Col>
                        </Row>
                        <Form.Check 
                            size="sm" 
                            type="radio" 
                            id="income" 
                            value="income" 
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)}/>
                        <Form.Label htmlFor="income"> Income</Form.Label>
                    </Stack>
                </Form.Group>
                    <Button type="submit"> Add Transaction</Button>
                </Form>
            <Container className="transactions">
                <h3>Transactions</h3>
                <ListGroup>
                    {transactions.map((transaction, index) => {
                        const {description, transactionAmount, transactionType} = transaction; 
                        return (
                        <ListGroup.Item key={index}>
                            <h4> {description} </h4>
                            <p> RM{transactionAmount} : <label style={{
                                    color: transactionType === "expense" ? "red" : "green"
                                }}> {transactionType} </label></p>
                        </ListGroup.Item>
                    );
                    })}
                </ListGroup>
            </Container>
        </>
    )
}