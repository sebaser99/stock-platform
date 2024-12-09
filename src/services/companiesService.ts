export const getAllCompanies = async ()=> {
    const url = `https://s3-ap-southeast-1.amazonaws.com/he-public-data/db12a41f8.json`

    const res = await fetch(url);
    const data = await res.json();
    return data;
}