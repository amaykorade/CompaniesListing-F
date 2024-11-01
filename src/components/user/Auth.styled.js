import styled from "styled-components";

export const SignUpStyled = styled.div`

.signup{
    margin: 100px 0 0 0;
}

h2{
    font-size: 1.5rem;
    font-weight: 400;
    margin: 50px 0 0 0;
    text-align: center;
}

form{
    /* border: 1px solid #DCE1EA; */
    width: 30%;
    height: 700px;
    margin: 30px auto;
}

.input{
    width: 100%;
    height: 50px;
    border: 1px solid #DCE1EA;
    border-radius: 5px;
    margin: 10px auto;
    padding: 0 0 0 15px ;
    letter-spacing: 1px;
}
#radio {
    display: flex;
    align-items: center;
    text-align: left;
    position: relative;
    top: 10px;
    left: 10px;
}
#radio label{
    margin: 0 0 0 10px;
}

button{
    position: relative;
    top: 30px;
    width: 100%;
    height: 35px;
    border: 1px solid #DCE1EA;
    border-radius: 5px;
    font-weight: 600;
    color: white;
    background-color: rgb(4,31,40);
}

@media screen and (max-width: 1100px) {
    h2{
        margin: 25px 0;
    }
    form{
        width: 40%;
        margin: 20px auto;
    }
}

@media screen and (max-width: 800px) {
    form{
        width: 50%;
        margin: 20px auto;
    }
}
@media screen and (max-width: 650px) {
    form{
        width: 70%;
    }
}
`

export const SignInStyled = styled.div`


.login{
    margin: 150px 0 0 0;
}

h2{
    font-size: 1.5rem;
    font-weight: 400;
    margin: 50px 0 0 0;
    text-align: center;
}

form{
    /* border: 1px solid #DCE1EA; */
    width: 30%;
    height: 300px;
    margin: 30px auto;
}

.input{
    width: 100%;
    height: 50px;
    border: 1px solid #DCE1EA;
    border-radius: 5px;
    margin: 10px 0;
    padding: 0 0 0 15px ;
    letter-spacing: 1px;
}


button{
    position: relative;
    top: 30px;
    width: 100%;
    height: 35px;
    border: 1px solid #DCE1EA;
    border-radius: 5px;
    font-weight: 600;
    color: white;
    background-color: rgb(4,31,40);
}

@media screen and (max-width: 1100px) {
    h2{
        margin: 25px 0;
    }
    form{
        width: 40%;
        margin: 20px auto;
    }
}

@media screen and (max-width: 800px) {
    form{
        width: 50%;
        margin: 20px auto;
    }
}
@media screen and (max-width: 650px) {
    form{
        width: 70%;
    }
}
`