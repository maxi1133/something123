export function User(state = null, action) 
{
    switch (action.type) 
    {
      case 'SetUser' : {
        return action.payload
      }
      default: { return state }
    }
}