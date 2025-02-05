export default function Home() {
  return (
    <>
      <Name name = "田中"/>
    </>
  );
}

type NameType = {
  name : string
};

const Name = ({name} : NameType) => {
  return(
      <h1>
          {name}さん、ようこそ！
      </h1>
  );
}
