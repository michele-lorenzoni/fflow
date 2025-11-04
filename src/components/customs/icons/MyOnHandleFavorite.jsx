import { useCallback } from 'react';
import MaterialSymbolsFavoriteOutline from '../../standard/icons/MaterialSymbolsFavoriteOutline';

function MyOnHandleFavorite() {
  const handleClick = useCallback(() => {
    window.open('https://github.com/michele-lorenzoni', '_blank');
  }, []);

  return (
    <button 
      className='flex justify-center items-center hover:bg-[#fafafa] h-[32px] w-[32px] border-b-1 border-[#ffa1ad] hover:border-pink-950 group/favorite transition-all duration-300'
      onClick={handleClick}
    >
      <MaterialSymbolsFavoriteOutline width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleFavorite;