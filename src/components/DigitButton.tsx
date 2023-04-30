export default function DigitButton({ digit }: { digit: number }) {
    return (
        <button 
            className={`digit-button digit-${digit}-button`}
        >
            { digit }
        </button>
    );
}