export const getServerSideProps = async ({ query }) => {
  const usr = await fetch(
    `https://jsonplaceholder.typicode.com/users/${query.id}`
  );
  const userSerialized = await usr.json();
  return {
    props: { user: userSerialized || null },
  };
};

const Profile = ({ user }) => {
  return !Object.keys(user).length ? (
    <div>Invalid User Id</div>
  ) : (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
};
export default Profile;
