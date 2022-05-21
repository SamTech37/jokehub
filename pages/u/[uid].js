import React from "react";
import { useRouter } from "next/router";
export default function User() {
  const router = useRouter();
  const { uid } = router.query;
  return (
    <div>
      <img
        src={`https://avatars.dicebear.com/api/croodles-neutral/${uid}.svg`}
        alt="poster"
        width={80}
        height={80}
      />
    </div>
  );
}

// export async function getServerSideProps(){

// };
