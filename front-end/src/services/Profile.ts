import Api from ".";

export interface iProfileApi {
  id: string;
  name: string;
  email: string;
  telephone: string;
  contacts: iContactsProfile[];
}

export interface iContactsProfile {
  id: string;
  name: string;
  email: string;
  telephone: string;
}

export async function ProfileApi() {
  const { data } = await Api.get<iProfileApi>("/profile");

  return data;
}
