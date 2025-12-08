// import Image from "next/image";
import ButtonRedirect from "@/app/components/ButtonRedirect";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
      </ul>

      <ButtonRedirect />
    </main>
  );
}
/* <div className="w-[700px] h-[700px]> bg-red-300"> */

/* <Image
          src="/images/anh.jpg"
          alt="anh"
          width={500}
          height={500}
          quality={75}
          className="w-[500px] h-[500px]"
        /> */

/* <Image
          src="https://images.pexels.com/photos/32844898/pexels-photo-32844898.jpeg"
          alt="pexel"
          width={200}
          height={200}
          quality={75}
          className="w-[500px] h-[500px]"
          title="pexels"
        /> */

/* nextJS giảm kích thước ảnh (size) */

/* quantity: chất lượng ảnh (mặc định 75) */

/* nếu dùng ảnh remote bên ngoài thì phải vào nextJS.config.ts để cấu hình */

/* </div> */
