import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, ScrollView } from 'react-native';

import { getUserInfo } from '../../ducks/reducer';
import Button from './Button';
import { MainHeading, SubHeading, BoldText } from '../../styles/Texts';
import { ButtonContainer, TwoButtonContainer } from '../../styles/Buttons';
import { MainContainer, AccountDetailsView, DetailViewContainer } from '../../styles/Views';
import profilePic from '../assests/profile.png';

class Account extends Component {

    state = {
        name: "",
        phone: "",
        email: '',
        DOB: ''
    }
    componentWillMount() {
        this.props.getUserInfo()
    }

    goToAccountSettings = () => {
        this.props.navigation.navigate('AccountSettings')
    }


    render() {
        const user = this.props.user;
        var options = { month: 'long', day: 'numeric' , year: 'numeric'  };


        return(
            <MainContainer> 
                <MainHeading >
                    Account Information
                </MainHeading>
                <View style={ styles.profilePic } >
                    <Image source={profilePic}  />
                </View>
<<<<<<< HEAD
                <SubHeading >
                First Name: { !user.firstname ? null:user.firstname }

                </SubHeading>
                <SubHeading >
                Last Name: { !user.lastname ? null:user.lastname}

                </SubHeading>
                <SubHeading >
                Phone: { !user.phone ? null:user.phone}

                </SubHeading>
                <SubHeading >
                Email: { !user.email ? null:user.email}

                </SubHeading>
                <SubHeading >
                Date of Birth: { !user.birthday ? null:
                new Date( user.birthday.slice(0,10).split('-').join(',')).toLocaleDateString('en-us', options)
                 }
                
=======
                
                <DetailViewContainer>
                    
                <ScrollView
                    directionalLockEnabled={true}
                    horizontal={true}
                    vertical={false}>
                    <View style={styles.scrollContainer} >
                    <AccountDetailsView>
                        <BoldText>
                            Name:
                        </BoldText>
                        <SubHeading >
                        { !user.firstname ? null:user.firstname +' ' + user.lastname}
                        </SubHeading>
                    </AccountDetailsView>

                    <AccountDetailsView>
                        <BoldText>
                            Phone Number:
                        </BoldText>
                        <SubHeading >
                        { !user.firstname ? null:user.phone}
                        </SubHeading>
                    </AccountDetailsView>

                    <AccountDetailsView>
                        <BoldText>
                            Email:
                        </BoldText>
                        <SubHeading >
                        { !user.firstname ? null:user.email}
                        </SubHeading>
                    </AccountDetailsView>
>>>>>>> master

                    <AccountDetailsView>
                        <BoldText>
                            Date of Birth:
                        </BoldText>
                        <SubHeading >
                            { !user.firstname ? null:
                            new Date( user.birthday.slice(0,10).split('-').join(',')).toLocaleDateString('en-us', options)
                            }
                        </SubHeading>
                    </AccountDetailsView>
                    </View>
                    </ScrollView>
                   
                </DetailViewContainer>
               
                <ButtonContainer>
                    <Button onPress={ () => this.goToAccountSettings() }>
                        Edit Account Info
                    </Button>
                </ButtonContainer>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps, { getUserInfo })(Account);

const styles = {
   profilePic: {
       alignSelf: 'center',
       width: 200,
       height: 200,
   },
   scrollContainer: {
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'flex-start',
       alignItems: 'flex-start'
   }
}