const {Schema,model}=require('mongoose');

const CategorySchema=Schema({
    name:{
        type:String,
        required: [true,"The name is required"],
        unique: true
    },
    state:{
        type:Boolean,
        default:true,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,
    }
});
// Se puede personalizar los metodos de mongoose
CategorySchema.methods.toJSON=function(){
    const { __v,state,...data }=this.toObject();
    return data
}


module.exports=model('Category',CategorySchema);
