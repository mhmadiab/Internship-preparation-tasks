const { PhoneNumberUtil } = require('google-libphonenumber');
const axios = require('axios');
const phoneUtil = PhoneNumberUtil.getInstance();
const regionDisplayNames = new Intl.DisplayNames(['en'], { type: 'region' });

const validateNumber = async (req, res) => {
    const { phoneNumber } = req.body;

    

    try {

        const parsedPhone = phoneUtil.parseAndKeepRawInput(phoneNumber)
        const isValid = phoneUtil.isValidNumber(parsedPhone)
 

        if (!isValid) {
            return res.json({ message: 'Invalid phone number.' , data : null })
        }

        const regionCode = phoneUtil.getRegionCodeForNumber(parsedPhone)
        const isValidForRegion = phoneUtil.isValidNumberForRegion(parsedPhone, regionCode)

       

        if (!isValidForRegion) {
            return res.json({ message: `The number is invalid for the region: ${regionCode}.` , data : null })
        }

        const countryCode = parsedPhone.getCountryCode()
        const countryName = regionDisplayNames.of(regionCode) || 'Unknown'
        

        if (!process.env.NUMVERIFY_API_KEY) {
            return res.status(500).json({ error: 'API key is missing.' })
        }

        const response = await axios.get(`http://apilayer.net/api/validate`, {
            params: {
                access_key: process.env.NUMVERIFY_API_KEY,
                number: phoneNumber,
            },
        })


        const operatorName = response.data.carrier || 'Unknown'

        res.json({
            message : "valid phone number",
            data : {
                countryCode: `+${countryCode}`,
                countryName,
                operatorName,
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while validating the phone number.' , data : null})
    }
};

module.exports = {
    validateNumber,
};
