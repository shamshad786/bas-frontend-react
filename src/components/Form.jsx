import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './Form.css';

const Form = () => {
    const jobPost = "http://localhost:5000/post";

    const [permanentAddressChecked, setPermanentAddressChecked] = useState(true);
    
    const [data, setData] = useState("");


    const fetchData = async ()=>{
        await axios.get(jobPost).then(res=>{
      setData(res.data);
      }).catch(err=>{
          console.log("error",err);
      })
    }

  useEffect(()=>{
    fetchData()
},[]);

    const sameAddress = (e)=>{
        const value = e.target.checked;
        if(value){
            setPermanentAddressChecked(false);
            setPermanentStreetName('-')
            setPermanentHouseNo('-')
            setPermanentVillage('-')
            setPermanentCity('-')
            setPermanentPostOffice('-')
            setPermanentState('-')
            setPermanentDistrict ('-')
            setPermanentPincode('-')
        }else if(!value){
            setPermanentAddressChecked(true);
            
        }
    }
    const [declaration, setDeclaration] = useState(false);
    

  
    // Form Handling with start

const [candidatename, setCandidateName] = useState('');
const [lastname, setLastName] = useState('');
const [fathername, setFatherName] = useState('');
const [mothername, setMotherName] = useState('');
const [dob, setDob] = useState('');
const [gender, setGender] = useState('');
const [cast, setCast] = useState('');
const [married, setMarried] = useState('');
const [applyfor, setApplyFor] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [education, setEducation] = useState('');
const [educationdivision, setEducationDivision] = useState('');
const [intermediate, setIntermediate] = useState('');
const [intermediatedivision, setIntermediateDivision] = useState('');
const [highschool, setHighSchool] = useState('');
const [highschooldivision, setHighSchoolDivision] = useState('');
const [profilePhoto, setProfilePhoto] = useState('');
const [signature, setSignature] = useState('');

//TODO: Present Address Handling Form.
const [presentstreetname, setPresentStreetName] = useState('');
const [presenthouseno, setPresentHouseNo] = useState('');
const [presentvillage, setPresentVillage] = useState('');
const [presentcity, setPresentCity] = useState('');
const [presentpostoffice, setPresentPostOffice] = useState('');
const [presentstate, setPresentState] = useState('');
const [presentdistrict, setPresentDistrict] = useState('');
const [presentpincode, setPresentPincode] = useState('');


//TODO: Permanent Address

const [permanentstreetname, setPermanentStreetName] = useState('');
const [permanenthouseno, setPermanentHouseNo] = useState('');
const [permanentvillage, setPermanentVillage] = useState('');
const [permanentcity, setPermanentCity] = useState('');
const [permanentpostoffice, setPermanentPostOffice] = useState('');
const [permanentstate, setPermanentState] = useState('');
const [permanentdistrict, setPermanentDistrict] = useState('');
const [permanentpincode, setPermanentPincode] = useState('');
    // Form Handling with end


    const declartionFunc = (e)=>{
        const value = e.target.checked;
       if(!value){
           setDeclaration(false)
          
       }else{
           setDeclaration(true);
         
       }
    }


    const submitForm = async(payId,payStatus)=>{
     try{

        await axios.post('http://localhost:5000/formdata',{
            candidatename: candidatename,
            lastname: lastname,
            fatherhusbandname: fathername,
            mothername: mothername,
            dateofbirth: dob,
            gender: gender,
            categorycast: cast,
            maritalstatus: married,
            postId: applyfor,
            email: email,
            mobile: phone,
            educationalqualification: education,
            educationdivision: educationdivision,
            intermediate: intermediate,
            intermediatedivision: intermediatedivision,
            highschool: highschool,
            highschooldivision: highschooldivision,
            uploadphoto: profilePhoto,
            uploadsignature: signature,
            address: {
                present: {
            street: presentstreetname,
            houseno: presenthouseno,
            village: presentvillage,
            city: presentcity,
            postoffice: presentpostoffice,
            state: presentstate,
            district: presentdistrict,
            pincode: presentpincode, 
            },
            permanent:{
                pr_street:permanentstreetname,
                pr_houseno: permanenthouseno,
                pr_village: permanentvillage,
                pr_city: permanentcity,
                pr_postoffice: permanentpostoffice,
                pr_state: permanentstate,
                pr_district: permanentdistrict,
                pr_pincode: permanentpincode
            }
        },
        isPresent: permanentAddressChecked ,
        isDeclaration: declaration,
        paymentStatus: payStatus ,
        paymentId: payId ,


        });

      }catch(err){
          console.log('form not submit', err);
      }
        
    }
    

    const initializeRazorpay = () => {
        // console.log("In Initialize");
         return new Promise((resolve) => {
           const script = document.createElement("script");
           script.src = "https://checkout.razorpay.com/v1/checkout.js";
     
           script.onload = () => {
             resolve(true);
           };
           script.onerror = () => {
             resolve(false);
           };
     
           document.body.appendChild(script);
         });
       };
     
     const makePayment = async (params) => {

        const post  = params.filter((data)=>{
            return data._id === applyfor
        })

        console.log(post[0].price);
       // console.log(params);
        
         console.log("in make payement");
         //createOrder({customer : ""})
 
         const res = await initializeRazorpay();
     
         if (!res) {
           alert("Razorpay SDK Failed to load");
           return;
         }
     
         // Make API call to the serverless API
         const data = await fetch("http://localhost:5000/api/payment", 
         { method: "POST" , 
             headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
             },
             body : JSON.stringify({price: post[0].price})
            }
             
             ).then((t) =>
           t.json());
         console.log(data);
         var options = {
           key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
           name: "Bhartiya Aviation Services",
           currency: data.currency,
           amount: data.amount,
           order_id: data.id,
           description: "Payment for NIAS",
           image: "/logo192.png",
           handler: function (response) {
             // Validate payment at server - using webhooks is a better idea.
             
             console.log(response.razorpay_payment_id);
             console.log(response.razorpay_order_id);
             console.log(response.razorpay_signature);
              submitForm(response.razorpay_payment_id,"paid");

            // console.log(response);
           },
        //    prefill: {
        //      name: "Shamshad",
        //      email: "shamshad3300@gmail.com",
        //      contact: "9999999999",
        //    },
           "theme": {
             "color": "#d1411e"
         }
         };
         const paymentObject = new window.Razorpay(options);
         paymentObject.open();
       };

 

  return (
    <div className='form-container'>
<div>
</div>

    <div className='inner-form'>
        <div className='candidate-name'>
            <label htmlFor="candidate-name">Candidate Name</label>
            <input type="text" id='candidate-name' placeholder='enter your first name' onChange={(e)=> setCandidateName(e.target.value)} />
        </div>
        <div className='last-name'>
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id='last-name' placeholder='enter your last name' onChange={(e)=> setLastName(e.target.value)}  />
        </div>
        <div className='father-name'>
            <label htmlFor="father-name">Father Name</label>
            <input type="text" id='father-name' placeholder='enter your father name'  onChange={(e)=> setFatherName(e.target.value)}/>
        </div>
        <div className='mother-name'>
            <label htmlFor="mother-name">Mother Name</label>
            <input type="text" id='mother-name' placeholder='enter your mother name'  onChange={(e)=> setMotherName(e.target.value)}  />
        </div>
        <div className='dob'>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id='dob' placeholder='enter your dob name'  onChange={(e)=> setDob(e.target.value)} />
        </div>
        <div className='gender'>
            <label htmlFor="gender">Gender</label>
           <select name="gender" id="gender" onChange={(e)=> setGender(e.target.value)} >
           <option value="not selected">Select Option</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
           </select>
        </div>
        <div className='categories-cast'>
            <label htmlFor="categories-cast">Category(Cast)</label>
           <select  id="categories-cast"  onChange={(e)=> setCast(e.target.value)}>
               <option value="not selected">Select Option</option>
               <option value="GENERAL">GENERAL</option>
               <option value="ST">SC</option>
               <option value="ST">ST</option>
               <option value="OBC">OBC</option>
           </select>
        </div>
        <div className='marital-status'>
            <label htmlFor="marital-status">Marital Status</label>
           <select  id="marital-status" onChange={(e)=> setMarried(e.target.value)}>
           <option value="not selected">Select Option</option>
               <option value="married">Married</option>
               <option value="unmarried">Unmarried</option>
           </select>
        </div>
        <div className='job-post'>
            <label htmlFor="job-post">Apply For</label>
           <select  id="job-post"  onChange={(e)=> setApplyFor(e.target.value)} >
           <option value='not selected'>Select Post</option>
                {
                    data?.body?.map(d =>  (
                        
                        
                         <option value={d._id}  key={d._id} >{d.name}</option>
                       
                          ))
                }
           </select>
        </div>
        <div className='email'>
            <label htmlFor="email">email</label>
            <input type="text" id='email' placeholder='enter your email' onChange={(e)=> setEmail(e.target.value)} />
        </div>
        <div className='phone'>
            <label htmlFor="phone">phone</label>
            <input type="number" id='phone' placeholder='enter your phone' onChange={(e)=> setPhone(e.target.value)} />
        </div>

        <div className='education'>
            <label htmlFor="education">Education</label>
           <select id="education" onChange={(e)=> setEducation(e.target.value)} >
               <option value="none">None</option>
               <option value="undergraduate">under graduate</option>
               <option value="graduate">graduate</option>
               <option value="postgraduate">post graduate</option>             
           </select>
        </div>
        <div className='education-division'>
            <label htmlFor="education-division">Division</label>
           <select id="education-division"  onChange={(e)=>  setEducationDivision(e.target.value)} >
           <option value="not selected">Select Option</option>
               <option value="firstdivision">First Division</option>
               <option value="seconddivision">Second division</option>
               <option value="thirddivision">Third Division</option>             
               <option value="none">None</option>
           </select>
        </div>
        <div className='intermediate'>
            <label htmlFor="intermediate">Intermediate</label>
            <input type="text" placeholder='intermediate'  onChange={(e)=>  setIntermediate(e.target.value)} />
          
        </div>
        <div className='education-division'>
            <label htmlFor="education-division">Division</label>
           <select id="education-division"  onChange={(e)=>   setIntermediateDivision(e.target.value)}>
           <option value="not selected">Select Option</option>
               <option value="firstdivision">First Division</option>
               <option value="seconddivision">Second division</option>
               <option value="thirddivision">Third Division</option>             
               <option value="none">None</option>
           </select>
        </div>
        <div className='highschoole'>
            <label htmlFor="highschoole">High School</label>
            <input type="text" placeholder='high school'  onChange={(e)=>   setHighSchool(e.target.value)}  />
        </div>
        <div className='education-division'> setHighSchoolDivision
            <label htmlFor="education-division">Division</label>
           <select id="education-division"  onChange={(e)=>   setHighSchoolDivision(e.target.value)} >
           <option value="not selected">Select Option</option>
               <option value="firstdivision">First Division</option>
               <option value="seconddivision">Second division</option>
               <option value="thirddivision">Third Division</option>             
               <option value="none">None</option>
           </select>
        </div>

        <div className='profile-photo'>
            <input type="file" placeholder='choose your photo'  onChange={(e)=> setProfilePhoto(e.target.value)}  />
        </div>

        <div className='signature-photo'>
            <input type="file" placeholder='choose your signature'  onChange={(e)=> setSignature(e.target.value)} />
        </div>

        <div className='present-address' >
        <h3>Present Address</h3>
            <div className='streetName'>
                <label htmlFor="street-name">Street Name</label>
                <input type="text" id='street-name' placeholder='Street-name'  onChange={(e)=> setPresentStreetName(e.target.value)}/>
            </div>
            <div className='houseno'>
                <label htmlFor="street-name">House No</label>
                <input type="text" id='street-name' placeholder='house no'  onChange={(e)=> setPresentHouseNo(e.target.value)}/>
            </div>
            <div className='village'>
                <label htmlFor="street-name">village</label>
                <input type="text" id='street-name' placeholder='village'  onChange={(e)=> setPresentVillage(e.target.value)}/>
            </div>
            <div className='city'>
                <label htmlFor="street-name">city</label>
                <input type="text" id='street-name' placeholder='city' onChange={(e)=> setPresentCity(e.target.value)} />
            </div>
            <div className='post-office'>
                <label htmlFor="street-name">post-office</label>
                <input type="text" id='street-name' placeholder='post office'  onChange={(e)=> setPresentPostOffice(e.target.value)}/>
            </div>
            <div className='state'>
            <label htmlFor="">State</label>
                <select name="" id=""  onChange={(e)=> setPresentState(e.target.value)} >
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Assam">Assam</option>
                </select>
            </div>
            <div className='district'>
                <label htmlFor="street-name">district</label>
                <input type="text" id='street-name' placeholder='district'  onChange={(e)=> setPresentDistrict(e.target.value)} />
            </div>
            <div className='pincode'>
                <label htmlFor="street-name">pincode</label> 
                <input type="number" id='street-name' placeholder='district'  onChange={(e)=> setPresentPincode(e.target.value)} />
            </div>
        </div>

        <div className='checked'>
            <label htmlFor="same Address">Same Address as above</label>
            <input type="checkbox" onChange={sameAddress} />
        </div>

        <div>
            {permanentAddressChecked ? ( <div className='permanent-address' >
        <h3>Permanent Address</h3>
            <div className='streetName'> 
                <label htmlFor="street-name">Street Name</label>
                <input type="text" id='street-name' placeholder='Street-name'  onChange={(e)=> setPermanentStreetName(e.target.value)}/>
            </div>
            <div className='houseno'>
                <label htmlFor="street-name">House No</label>
                <input type="text" id='street-name' placeholder='house no'  onChange={(e)=> setPermanentHouseNo(e.target.value)}/>
            </div>
            <div className='village'>
                <label htmlFor="street-name">village</label>
                <input type="text" id='street-name' placeholder='village'  onChange={(e)=> setPermanentVillage(e.target.value)}/>
            </div>
            <div className='city'>
                <label htmlFor="street-name">city</label> 
                <input type="text" id='street-name' placeholder='city'  onChange={(e)=> setPermanentCity(e.target.value)}/>
            </div>
            <div className='post-office'>
                <label htmlFor="street-name">post-office</label>
                <input type="text" id='street-name' placeholder='post office'  onChange={(e)=> setPermanentPostOffice(e.target.value)}/>
            </div>
            <div className='state'>
            <label htmlFor="">State</label>
                <select name="" id=""  onChange={(e)=> setPermanentState(e.target.value)}>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Assam">Assam</option>
                </select>
            </div>
            <div className='district'>
                <label htmlFor="street-name">district</label>
                <input type="text" id='street-name' placeholder='district' onChange={(e)=> setPermanentDistrict(e.target.value)} />
            </div>
            <div className='pincode'>
                <label htmlFor="street-name">pincode</label>
                <input type="number" id='street-name' placeholder='pincode' onChange={(e)=> setPermanentPincode(e.target.value)}/>
            </div>
        </div>): ("")}
        </div>

            <div className='declaration'>
               <h2>Declaration</h2>
               <input type="checkbox" required={true}  onChange={declartionFunc} />
               <p>
               I declare that the name, class, date of birth, address and other information given by me in the online application form is correct to the best of my knowledge and belief. Which I declare to be truely correct. If the above information is found incomplete or incorrect, my candidature is liable to be terminated at any time.
               </p>
            </div>

            <div className='submit'>
                <button className='submit-btn' type='submit' onClick={()=> makePayment(data.body)}>Sumbit</button>
            </div>

    </div>


    </div>
  )
}


export default Form