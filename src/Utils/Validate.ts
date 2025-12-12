export const checkValidData =(email,password)=>{
    const isEmailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email);
    const isPasswordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);
    // const isNameValid = /^[a-zA-Z\u00C0-\u00ff]{2,}(?: [a-zA-Z\u00C0-\u00ff]+){2,20}$/.test(fullname);

    if(!isEmailValid) return "Email id is not Valid";
    if(!isPasswordValid) return "password is not Valid";
    //  if(!isNameValid) return "Name is not Valid";

    return null;
}