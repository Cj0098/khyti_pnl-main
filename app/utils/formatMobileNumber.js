export default function formatMobileNumber(mobileNumber) {
	const mobileNumberLength = mobileNumber.length;
	if (mobileNumberLength < 5) return mobileNumber;
	if (mobileNumberLength < 8) return `${mobileNumber.slice(0, 4)} ${mobileNumber.slice(4)}`;
	return `${mobileNumber.slice(0, 4)} ${mobileNumber.slice(4, 7)} ${mobileNumber.slice(7, 11)}`;
}
