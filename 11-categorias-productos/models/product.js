const {Schema,model}=require('mongoose');

const ProductSchema=Schema({
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
    },
    price:{
        type:Number,
        default:0,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    description:{
        type:String,
        default:'',
    },
    available:{
        type:Boolean,
        default:true,
    },
});
// Se puede personalizar los metodos de mongoose
ProductSchema.methods.toJSON=function(){
    const { __v,state,...data }=this.toObject();
    return data
}


module.exports=model('Product',ProductSchema);
