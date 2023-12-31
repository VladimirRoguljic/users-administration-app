export interface Role {
  id: string;
  name: string;
  description?: string;
  composite?: string;
  realmMappings: Role[];
}
