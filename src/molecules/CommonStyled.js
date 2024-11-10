import styled from "styled-components";

export const NavbarStyled = styled.div`

.nav{
    border: 1px solid black;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: rgb(0,12,23);
    /* color: white; */
}

.navbar{
    /* border: 1px solid black; */
    width: 90%;
    display: flex;
    /* align-items: center; */
    margin: 0 auto;
    color: white;
}

.left{
    /* border: 1px solid red; */
    width: 20%;
    display: flex;
    align-items: center;
    margin-top: -5px;
}
.left a{
    color: white;
    text-decoration: none;
}

.mid{
    /* border: 1px solid black; */
    width: 70%;
}

.right{
    /* border: 1px solid red; */
    width: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
}

.right a{
    color: white;
    text-decoration: none;
}

.right button{
    border: 1px solid rgb(0,12,23);
    background-color: rgb(0,12,23);
}

.hamburger{
    display: none;
    margin-top: -6px;
}

.hamburger div{
        width: 20px;
        height: 1px;
        margin: 6px 0;
        border: 1px solid white;
        /* margin-top: 10px; */
    }


    .nav-links{
        display: none;
        border-top: 1px solid white;
        background-color:  rgb(0,12,23);
    }

    .nav-links p a{
        color: white;
        text-decoration: none;
    }

    @media screen and (max-width: 1300px) {
        .mid{
            width: 70%;
        }
        .right{
            width: 15%;
        }
    }


    @media screen and (max-width: 900px) {
        .navbar{
            justify-content: space-between;
            align-items: center;
        }
        .mid{
            display: none;
        }
        .right{
            display: none;
        }

        .hamburger{
            display: block;
        }

        .nav-links{
            display: flex;
            flex-direction: column;
            text-align: center;
            /* margin-top: 10px; */
        }

        .nav-links p{
            margin: 10px 0;

        }
    }

`
