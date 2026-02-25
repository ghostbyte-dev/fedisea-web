import type { Instance } from "@/lib/types";

export const mapInstance = (data: any): Instance => {
  return ({
    domain: data.domain
  })
};