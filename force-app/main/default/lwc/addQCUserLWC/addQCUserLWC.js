import { LightningElement, track, api } from 'lwc';
import getSFUsers from "@salesforce/apex/qualityCloudsSettingsLWCController.getAllUsers";
import getFilteredSFUsers from "@salesforce/apex/qualityCloudsSettingsLWCController.getFilteredSFUsers";
import getAllProfiles from "@salesforce/apex/qualityCloudsSettingsLWCController.getAllProfiles";
import addQCUsers from "@salesforce/apex/qualityCloudsSettingsLWCController.addQCUsers";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
  { label: 'Name', fieldName: 'name', sortable: true },
  { label: 'Profile', fieldName: 'profile' },
];


export default class AddQCUserLWC extends LightningElement {

    @api newUsers = [];

    @track filter;
    @track filterProfileOptions;
    @track showSelectProfiles;  
    @track showSelectUsers;  
    @track showSpinner;
    @track selectedUsers = [];

    sfUsers = [];
    columns = columns;
    filter = '';
    filterProfiles = '';
    showSelectProfiles = false;  
    showSelectUsers = true;  
    valueforAll = '';
    
    pickListOptions = [
          { label: 'QC Admin', value: 'QCAdmin' },
          { label: 'QC Regular', value: 'QCRegular' },
          { label: 'QC Integration', value: 'QCIntegration' }
    ]

    get selectedUsersTable() {
      return this.selectedUsers;
    }
    
    connectedCallback() {
      this.draftValues = [];
      getSFUsers().then((users) => {        
        this.sfUsers = users;    
      })
      this.getAllProfiles();
    }
    
    closeAddUser() {
        const closeEvent = new CustomEvent("close", { detail: this.selectedUsers });
       
        this.dispatchEvent(closeEvent);
    }

    handleChangeFilter(event) {
      this.filter= event.target.value;       
      if(this.filter.length >= 5 || this.filter.length == 0) {
          this.getFilteredUsers();
      }
    }

    checkEnter(event){
      if(event.keyCode === 13){
        this.getFilteredUsers();
      }
    }

    getFilteredUsers() {
      getFilteredSFUsers({filteredName: this.filter, profile: this.filterProfiles}).then((users) => {        
        this.sfUsers = users;    
      })
    }

    getAllProfiles() {
      getAllProfiles().then((result) => {     
        this.filterProfileOptions = [];
        for (var key in result) {
            this.filterProfileOptions = [...this.filterProfileOptions, { label: key, value: result[key] }];
        }
      });
    }

    handleChangeProfile(event) {
      this.filterProfiles = event.target.value;     
      this.getFilteredUsers();
    }

    getSelectedUsers(event) {
      this.selectedUsers  = event.detail.selectedRows;

      if(this.selectedUsers.length > 50) {
        this.dispatchEvent(
          new ShowToastEvent({
              title: 'Error',
              message: 'No more than 50 users can be selected at once.',
              variant: 'error',
          }),
        );  
      }
    }
    handleChangeProfileUser(event) {
      let selectedId = event.currentTarget.name;
      let objIndx = this.selectedUsers.findIndex((item => item.userId == selectedId));
      this.selectedUsers[objIndx].qcprofile = event.detail.value;
    }

    openSelectQCProfile() {
      this.showSelectProfiles = true;  
      this.showSelectUsers = false;  
    }

    back() {
      this.showSelectProfiles = false;  
      this.showSelectUsers = true;        
      this.selectedUsers  = [];      
    }

    submit() {
      let myMap = this.selectedUsers.map((u)=>({[u.userId]:u.qcprofile}));
      this.showSpinner=true;    
      this.showSelectProfiles = false;  
      this.showSelectUsers = false;      
      addQCUsers({users: JSON.stringify( this.selectedUsers)}).then((response) => {        
        if(response.isSuccess == 'OK') {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Connection successful',
                  message: response.message,
                  variant: 'success',
              }),
          );
          this.closeAddUser();          
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error connecting to QC',
                    message: response.message,
                    variant: 'error',
                }),
            );
        } 
        this.showSpinner=false;    
      });
    }
}