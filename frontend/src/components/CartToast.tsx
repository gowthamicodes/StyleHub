interface CartToastProps {
  message: string;
}

const CartToast = ({ message }: CartToastProps) => {
  return (
    <div className="cart-toast">
      <span>✓</span>
      {message}
    </div>
  );
};

export default CartToast;