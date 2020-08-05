import mongoose from 'mongoose';

const InfoSchema = new mongoose.Schema({
    id: {
        type: String,
        validate: {
            validator: id => UserInfo.doesNotExist({
                id
            }),
            message: "User already registered"
        }
    },
    name:String,
    phoneNumber:Number,
    companyName:String,
    storeName:String,
    primaryProductCategory:String,
    pincode:Number,
    addressLine1:String,
    addressLine2: String,
    city:String,
    state:String,
    country:String,
    gst: String,
    pan:String
},
 {
     timestamps: true
 }
)

InfoSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};
const UserInfo = mongoose.model('userInfo',InfoSchema);
export default UserInfo;