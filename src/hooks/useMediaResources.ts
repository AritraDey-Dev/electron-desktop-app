import { getMediaResources } from "@/lib/utils";
import { useReducer } from "react";

export type SourceDeviceStateProps = {
  displays: {
    appIcon: null;
    display_id: string;
    id: string;
    name: string;
    thumnail: string;
  }[];
  audioInputs: {
    deviceId: string;
    kind: string;
    label: string;
    groupId: string;
  }[];
  error: string | null;
  isPending: boolean;
};

type DisplayActionProps = {
  type: 'GET_DEVICES';
  payload: SourceDeviceStateProps;
};

export const useMediaResources = () => {
  const [state, dispatch] = useReducer(
    (state: SourceDeviceStateProps, action: DisplayActionProps) => {
      switch (action.type) {
        case 'GET_DEVICES':
          return { ...state, ...action.payload };
        default:
          return state;
      }
    },
    {
      displays: [],
      audioInputs: [],
      error: null,
      isPending: false,
    }
  );

  const fetchMediaResources = async () => {
    dispatch({
      type: 'GET_DEVICES',
      payload: {
        isPending: true,
        displays: state.displays,
        audioInputs: state.audioInputs,
        error: null,
      },
    });

    try {
      const res = await getMediaResources();
      dispatch({
        type: 'GET_DEVICES',
        payload: {
          displays: res.displays,
          audioInputs: res.audio,
          isPending: false,
          error: null,
        },
      });
    } catch (error) {
      dispatch({
        type: 'GET_DEVICES',
        payload: {
          displays: [],
          audioInputs: [],
          isPending: false,
          error: error.message || 'Failed to fetch media resources',
        },
      });
    }
  };

  return {
    state,
    fetchMediaResources,
  };
};
