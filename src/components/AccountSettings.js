import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import Button  from './Button';
import { updateUserInfo } from '../../ducks/reducer';
import { AccountInput } from '../../styles/Inputs';
import { MainHeading } from '../../styles/Texts';
import { TwoButtonContainer, ButtonContainer } from '../../styles/Buttons';
import HalfButton from './HalfButton';
import { HalfButtonPush, HalfButtonText } from '../../styles/Buttons';
import { MainContainer } from '../../styles/Views';
// import profilePic from '../assests/profile.png';



class Account extends Component {

    state = {
        // name: 'michael',
        // picture: this.props.user.picture,
        phone: 'phone number',
        email: 'email address',
        DOB: 'MM/DD/YYYY',
        newFirstName: '',
        newLastName: '',
        newPhone: '',
        newEmail: '',
        newDOB: ''
    }

    // componentDidMount(){ this.props.user.length === 0 ? this.props.navigation.navigate( 'Login' ) : null }
  
    goToAccount = () => {
        this.props.navigation.navigate('Account')
    }

    goToPhotos = () => {
        this.props.navigation.navigate('Photos');
        console.log('upload photo button')
    }

    saveUser(){
        const user = this.props.user;
        const userPic = this.props.navigation.state.params

        let userUpdatedInfo = {
            
            "firstname": ( this.state.newFirstName.length >=1 ? this.state.newFirstName : user.firstname ) ,
            "lastname":( this.state.newLastName.length >=1 ? this.state.newLastName : user.lastname ) ,
            "email":( this.state.newEmail.length >=1 ? this.state.newEmail : user.email ) ,
            "picture":!userPic ?  user.picture :   userPic.photoURI,
            "birthday":( this.state.newDOB.length >=1 ? this.state.newDOB : user.birthday ) ,
            "phone":( this.state.newPhone.length >=1 ? this.state.newPhone : user.phone ) ,
        }
        console.log('userUpdatedInfo', userUpdatedInfo)
        this.props.updateUserInfo(userUpdatedInfo)
        .then( _=> {
            return this.goToAccount()
        })
    }

    render() {
        console.log(this.props.navigation ? this.props.navigation: null)
        const user = this.props.user;
        var options = { month: 'long', day: 'numeric' , year: 'numeric'  };
        const userPic = this.props.navigation.state.params
        console.log("testStatus:", this.props.testStatus)

        // console.log(this.state.phone)
        // console.log(this.state.email)

// resource for react native inputs: https://facebook.github.io/react-native/docs/textinput.html#onsubmitediting

        return(
            <MainContainer>
                <MainHeading >
                     Edit Account Information
                 </MainHeading>
                 <View style={ styles.profilePic } >
                 <Image source=
                    {{ uri: !userPic ?  user.picture :   userPic.photoURI }}  
                    style={{width: 200, height: 200, borderRadius: 100}} />
                        <ButtonContainer style={{ width: '70%', alignSelf: 'center' }}>
                            <Button onPress={() => this.goToPhotos() }>
                              upload images
                             </Button>
                         </ButtonContainer>
                 </View>
                 <TwoButtonContainer>
                <AccountInput 
                placeholder='First Name'
                    style={styles.names}
                    onChangeText={(newFirstName) => this.setState({newFirstName})}
                    value={user.firstname}>
                </AccountInput>
                <AccountInput 
                    placeholder='Last Name'
                    style={styles.names}
                    onChangeText={(newLastName) => this.setState({newLastName})}
                    value={user.lastname }>
                </AccountInput>
                </TwoButtonContainer>
                <AccountInput 
                placeholder='Phone Number'
                    onChangeText={(newPhone) => this.setState({newPhone})}
                    value={user.phone}>
                </AccountInput>
                <AccountInput 
                placeholder='Email'
                    onChangeText={(newEmail) => this.setState({newEmail})}
                    value={user.email}>
                </AccountInput>
                <AccountInput 
                    placeholder='Birthday'
                    onChangeText={(newDOB) => this.setState({newDOB})}
                    value={ !user.birthday ? null: new Date( user.birthday.slice(0,10).split('-').join(',')).toLocaleDateString('en-us', options)}>
                </AccountInput>
                <TwoButtonContainer>

                    <HalfButtonPush  
                        onPress={ () => this.saveUser() }>
                        <HalfButtonText>
                        Save
                        </HalfButtonText>
                    </HalfButtonPush>


                    <HalfButtonPush cancel 
                        onPress={ () => this.goToAccount() }>
                        <HalfButtonText>
                            Cancel
                        </HalfButtonText>
                    </HalfButtonPush>
                </TwoButtonContainer>
            </MainContainer>
        )
    }
}
function mapStateToProps(state) {
    return {
      user: state.user,
      testStatus: state.testStatus
    }
  }
  
  export default connect(mapStateToProps, { updateUserInfo })(Account);

const styles = {
    profilePic: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
    names: {
        width: '47%'
    }
 }