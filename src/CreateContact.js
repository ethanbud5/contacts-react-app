import React,{Component} from "react"
import ImageInput from "./ImageInput"
import serializeForm from "form-serialize";

class CreateContact extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        const values = serializeForm(e.target,{hash:true});
        if(this.props.onCreateContact){
            this.props.onCreateContact(values);
        }
    }
    render(){
         return(
             <div>
                 <a 
                    className="close-create-contact" 
                    href="#" 
                    onClick={()=>this.props.toNavigate("list")} 
                 >Close</a>
                 <form onSubmit={this.handleSubmit} className="create-contact-form">
                    <ImageInput
                        className="create-contact-avatar-input"
                        name="avatarURL"
                        maxHeight={64}
                    />
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name"/>
                        <input type="text" name="email" placeholder="Email"/>
                        <button>Add Contact</button>
                    </div>
                 </form>
             </div>
         )
    }
}

export default CreateContact;